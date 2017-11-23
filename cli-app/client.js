const program = require('commander');
const { prompt } = require('inquirer'); 

const axios = require('axios');

program
.version('0.0.1')
.description('REST API client program');

//Add task
program
.command('add')
.alias('a')
.description('add task')
.action(()=>{
    var url = '';
    var data = {};
    const questions = [
    {
        type : 'input',
        name : 'url',
        message : 'Enter url ...',
        default: 'http://127.0.0.1:8081/tasks'
    },
    {
        type : 'input',
        name : 'title',
        message : 'Enter title ...',
        default: 'task1'
    },
    {
        type : 'input',
        name : 'description',
        message : 'Enter description ...',
        default: 'new task'
    },
    {
        type : 'list',
        name : 'completed',
        message : 'Choose status ...',
        choices: ['true', 'false'],
        default: 1
    }
    ];
    
    prompt(questions)
    .then(answers => {
        url = answers.url;
        data.title = answers.title;
        data.description = answers.description;
        data.completed = answers.completed;

        axios
        .post(url, data)
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        });          
    });
})

//get task
program
.command('get')
.alias('g')
.description('get a specific or all tasks ')
.action(() => {
    var questions = [
        {
            type : 'input',
            name : 'url',
            message : 'Enter url ...',
            default: 'http://127.0.0.1:8081/tasks'
        },
        {
            type : 'input',
            name : '_id',
            message : 'Enter id (all/specific id)...',
            default: 'all'
        }
    ];
    
    prompt(questions)
    .then(answers => {
        var url = answers._id === 'all'? answers.url : answers.url + '/' + answers._id;
        console.log(url);
        axios
        .get(url)
        .then(response => {
                for (var i = 0; i < response.data.length; i++){
                    console.log(response.data[i]);
                }
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err);
    });   

})

//update task
program
.command('update')
.alias('u')
.description('update task')
.action(()=>{
    var questions = [
        {
            type : 'input',
            name : 'url',
            message : 'Enter url ...',
            default: 'http://127.0.0.1:8081/tasks'
        },
        {
            type : 'input',
            name : '_id',
            message : 'Enter id ...'
        },
        {
            type : 'input',
            name : 'title',
            message : 'Enter title ...'
        },
        {
            type : 'input',
            name : 'description',
            message : 'Enter description ...'
        },
        {
            type : 'list',
            name : 'completed',
            message : 'Choosse status ...',
            choices: ['true', 'false'],
            default: 1
        }
    ];
    
    prompt(questions)
    .then(answers => {
        var url = answers.url;
        var taskNew = {_id: answers._id, title: answers.title, description: answers.description, completed: answers.completed};
        axios
        .put(url, taskNew)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err);
    });          
})

//del task
program
.command('del')
.alias('d')
.description('del task with specific id')
.action(() => {
    var questions = [
        {
            type : 'input',
            name : 'url',
            message : 'Enter url ...',
            default: 'http://127.0.0.1:8081/tasks'
        },
        {
            type : 'input',
            name : '_id',
            message : 'Enter id ...'
        }
    ];
    
    prompt(questions)
    .then(answers => {
        var url = answers.url + '/' + answers._id;
        axios
        .delete(url)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err);
    });   
})

//list service api
program
.command('list')
.alias('l')
.description('list service APIs')
.action(() => {
    var questions = [
        {
            type : 'input',
            name : 'url',
            message : 'Enter url ...',
            default: 'http://127.0.0.1:8081/'
        }
    ];
    
    prompt(questions)
    .then(answers => {
        var url = answers.url;
        axios
        .get(url)
        .then(response => {
            for (var i = 0; i < response.data.length; i++){
                console.log(response.data[i]);
            }            
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err);
    });   
})

program.parse(process.argv);
