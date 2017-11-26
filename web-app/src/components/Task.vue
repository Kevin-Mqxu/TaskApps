<template>
  <div class='container'>
    <div class="card" v-show="!isEditing">
        <div class="card-body">
            <div class='card-title'>
                {{ task.title }}
            </div>
            <div class='card-text'>
                {{ task.description }}
            </div>

            <button class="btn btn-primary" v-on:click="completeTask(task)" v-show="!task.completed">
                <i class="fa fa-check" aria-hidden="true"></i><span>Complete</span>
            </button>

            <div class="btn-group" role="group">
                    <button class="btn btn-primary" v-on:click="editTask(task)">
                        <i class="fa fa-pencil fa-fw"></i><span>Edit</span>
                    </button>
                    <button class="btn btn-primary" v-on:click="deleteTask(task)">
                        <i class="fa fa-trash-o fa-lg"></i><span>Delete</span> 
                    </button>            
            </div>
        </div>
    </div>
    <div v-show="isEditing">
        <div class='form-group'>
          <label for="titleInput">Title</label>
          <input type='text' class="form-control" id="titleInput" v-model="task.title" >
        </div>
        <div class='form-group'>
          <label for="descriptionInput">Description</label>
          <input type='text' class="form-control" id="descriptionInput" v-model="task.description" >
        </div>
        <div class="btn-group" role="group">
          <button class='btn btn-primary' v-on:click="saveTask(task)">
            <i class="fa fa-check" aria-hidden="true"></i><span> Save</span>
          </button>
          <button class='btn btn-primary' v-on:click="cancelTaskEditing(task)">
            <i class="fa fa-times" aria-hidden="true"></i><span>Cancel</span>
          </button>        
        </div>
    </div>
    <div>
        <div class="alert alert-info" role="alert" v-show="!task.completed">
            Still in progress. 
        </div>
        <div class="alert alert-info" role="alert" v-show="task.completed">
            Already completed.
        </div>
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
        cancelTaskEditing(task) {
            this.isEditing = false;
        },
        deleteTask(task) {
            this.$emit('delete-task', task);
        },
        completeTask(task) {
            console.log("Completing task:" + JSON.stringify(task));
            task.completed = true;
            this.$emit('complete-task');
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
  