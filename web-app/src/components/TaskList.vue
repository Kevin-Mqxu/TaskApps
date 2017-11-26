<template>
    <div>
        <task v-on:delete-task="deleteTask"  v-on:complete-task="completeTask" v-for="task in tasks" v-bind:task='task' v-bind:key="task.id"  v-bind:tasksUrl="tasksUrl">
        </task>
    </div>
</template>

<script type = "text/javascript" >
const axios = require('axios');
var Chart = require('chart.js');

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
            this.$emit('del-task');
            var url = this.tasksUrl + '/' + task._id;
            axios
            .delete(url)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(error);
            });   
        },
        completeTask() {
            console.log("complete task invoked in tasklist.");
            this.$emit('complete-task');
        },
    }    
};
</script>
<style>
</style>