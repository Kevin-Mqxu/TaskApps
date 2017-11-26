<template>
  <div class="container">
    <button class='btn btn-primary' v-on:click="openForm()" v-show="!isCreating">
      <i class="fa fa-plus" aria-hidden="true"></i><span> Create a new task</span>
    </button>
    <div class='container' v-show="isCreating">
          <div class='form-group'>
            <label for="inputTitle">Title</label>
            <input v-model="titleText" type='text' id="inputTitle" defaultValue="">
          </div>
          <div class='form-group'>
            <label for="inputDescription">Description</label>
            <input v-model="descriptionText" type='text' id="inputDescription" defaultValue="">
          </div>
          <div class="btn-group" role="group">
            <button class='btn btn-primary' v-on:click="sendForm()">
              <i class="fa fa-check" aria-hidden="true"></i><span>Create</span>
            </button>
            <button class='btn btn-primary' v-on:click="closeForm()">
              <i class="fa fa-times" aria-hidden="true"></i><span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      descriptionText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
        console.log('send Form entered.');
        console.log(this.titleText + ' ' + this.descriptionText);
        if (this.titleText.length > 0 && this.descriptionText.length > 0) {
            const title = this.titleText;
            const description = this.descriptionText;
            console.log("title:" + title);
            console.log("description:" + description);
            this.$emit('add-task', {
            title,
            description,
            completed: false,
            });
            this.newTaskText = '';
        }
        this.isCreating = false;
    },
  },
};
</script>