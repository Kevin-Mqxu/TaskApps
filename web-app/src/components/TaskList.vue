<template>
  <div>
    <p>Completed Tasks: {{tasks.filter(task => {return task.completed === true}).length}}</p>
    <p>In-Progress Tasks: {{tasks.filter(task => {return task.completed === false}).length}}</p>
    <task v-on:delete-task="deleteTask" v-for="task in tasks" v-bind:task='task' v-bind:key="task.id"  v-bind:tasksUrl="tasksUrl">
    </task>
  </div>
</template>

<script type = "text/javascript" >
const axios = require('axios');
import Task from './Task'
export default {
    props: ['tasks', 'tasksUrl'],
    components: {
        Task
    },
    methods: {
        deleteTask(task) {
            const taskIndex = this.tasks.indexOf(task);
            this.tasks.splice(taskIndex, 1);

            var url = this.tasksUrl + '/' + task._id;
            axios
            .delete(url)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(error);
            });   
        }                
    }    
};
</script>
<style>
</style>