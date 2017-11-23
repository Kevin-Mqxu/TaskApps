<template>
  <div class='ui centered card'>
    <div class="content" v-show="!isEditing">
      <div class='header'>
          {{ task.title }}
      </div>
      <div class='meta'>
          {{ task.description }}
      </div>
      <div class='extra content'>
            <span class='right floated edit icon' v-on:click="editTask(task)">
                <i class='edit icon'></i>
            </span>
            <span class='right floated trash icon' v-on:click="deleteTask(task)">
                <i class='trash icon'></i>
            </span>            
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Title</label>
          <input type='text' v-model="task.title" >
        </div>
        <div class='field'>
          <label>Description</label>
          <input type='text' v-model="task.description" >
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="saveTask(task)">
            Save
          </button>
        </div>
      </div>
    </div>
    <div class='ui bottom attached green basic label' v-show="!isEditing && task.completed">
        Completed
    </div>
    <div class='ui bottom attached red basic button' v-on:click="completeTask(task)" v-show="!isEditing && !task.completed">
        Complete
    </div>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    props: ['task', 'tasksUrl'],
    data() {
        return {
            isEditing: false
        }
    },
    methods: {
        editTask(task) {
            this.isEditing = true;
        },
        saveTask(task) {
            this.isEditing = false;
            axios
            .put(this.tasksUrl, task)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(error);
            });   
        },
        deleteTask(task) {
            this.$emit('delete-task', task);
        },
        completeTask(task) {
            console.log("Completing task:" + JSON.stringify(task));
            task.completed = true;
            console.log("Putting task:" + JSON.stringify(task));
            axios
            .put(this.tasksUrl, task)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(error);
            });               
        }        
    }            
}
</script>
  