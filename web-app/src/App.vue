<template>
  <div id="app">
    <div v-show="!this.taskLoaded">
      <button class='btn btn-primary' v-on:click="loadTasks">
        <i class="fa fa-database" aria-hidden="true"></i><span>Load tasks</span>
      </button>
    </div>
    <div class="container" v-show="this.taskLoaded">
        <div class="row">
          <div class="col">
              <canvas id="barChart"></canvas>            
          </div>
          <div class="col">
            <p>Completed Tasks: {{tasks.filter(task => {return task.completed === true}).length}}</p>
            <p>In-Progress Tasks: {{tasks.filter(task => {return task.completed === false}).length}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <create-task v-on:add-task="addTask"></create-task>
          </div>
          <div class="col">
            <task-list v-bind:tasks="tasks" v-bind:tasksUrl="tasksUrl" v-on:del-task="delTask" v-on:complete-task="completeTask"></task-list>
          </div>
        </div>
    </div>
    
  </div>
</template>

<script>
const axios = require('axios');
var querystring = require('querystring');
import TaskList from './components/TaskList'
import CreateTask from './components/CreateTask'

export default {
  name: 'app',
  components: {
    TaskList, 
    CreateTask
  },

  data() {
      return {
        tasksUrl: 'http://127.0.0.1:8081/tasks',
        tasks: [],
        taskLoaded: false
      };    
  },

  mounted: function () {
      this.$nextTick(function () {
          this.loadTasks();
      })
  },

  methods: {
    addTask(task) {
      console.log("addTask entered.");
      this.tasks.push(task);
      console.log("rendering chart after add task.");
      this.renderChart();
      axios
      .post(this.tasksUrl, task)
      .then(res => {
          console.log(res.data);
          task._id = res.data._id;
      })
      .catch(err => {
          console.log(error);
      });   
    },
    
    delTask() {
      console.log("rendering chart after del task.");
      this.renderChart();
    },

    completeTask(){
      console.log("complete task invoked in tasklist.");
      this.renderChart();
    },
    
    loadTasks(){
      var url = this.tasksUrl + '?' + querystring.stringify({r:Math.random()});
      console.log(url);
      axios
      .get(url)
      .then(res => {
        while (this.tasks.pop()) {}
        res.data.forEach(element => {
          this.tasks.push(element)
        });
        console.log("this.tasks.length:" + this.tasks.length);
        this.taskLoaded = true;
        console.log("rendering chart after loading task.");
        this.renderChart();
      })
      .catch(err => {
        console.log("Tasks cannot be loaded correctly, using hard-coded tasks instead. Error details: " + err);
        alert("Load error.");
      })
    },

    renderChart(){
        $("#barChart").replaceWith('<canvas id="barChart"></canvas>');
        var ctx = document.getElementById("barChart");
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Total task numbers"],
                datasets: [
                  {
                    label: "Completed",
                    data: [
                        this.tasks.filter(task => {return task.completed === true}).length
                    ],
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.5)'
                    ],
                    borderColor: [
                        'rgba(0, 255, 0, 1)'
                    ],
                    borderWidth: 1
                  },
                  {
                    label: "In progress",
                    data: [
                        this.tasks.filter(task => {return task.completed === false}).length
                    ],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1
                  }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: '# of tasks',
                    fontSize: 24
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgba(0, 0, 0, 1)'
                    }
                },             
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }            
        });
    }
  }
}
</script>

