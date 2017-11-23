<template>
  <div id="app">
    <button class='ui basic button icon' v-on:click="loadTasks">
      Load
    </button>
    <create-task v-on:add-task="addTask"></create-task>
    <task-list v-bind:tasks="tasks" v-bind:tasksUrl="tasksUrl"></task-list>
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
        tasks: [{
          title: 'Placeholder Task',
          description: 'Click load button to loading tasks from database',
          completed: false
        }]
      };    
  },
  methods: {
    addTask(task) {
      console.log("addTask entered.");
      this.tasks.push(task);
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
    
    loadTasks(){
      var url = this.tasksUrl + '?' + querystring.stringify({r:Math.random()});
      console.log(url);
      axios
      .get(url)
      .then(res => {
        console.log("Tasks have been loaded.");
        console.log("this.tasks.length:" + this.tasks.length);
        console.log("res.data.length:" + res.data.length);
        //this.tasks.splice(0, this.tasks.length);
        while (this.tasks.pop()) {}
        console.log("this.tasks.length:" + this.tasks.length);
        res.data.forEach(element => {
          this.tasks.push(element)
        });
        // this.tasks.concat(res.data);
        console.log("this.tasks.length:" + this.tasks.length);
      })
      .catch(err => {
        console.log("Tasks cannot be loaded correctly, using hard-coded tasks instead. Error details: " + err);
        alert("Load error.");
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
