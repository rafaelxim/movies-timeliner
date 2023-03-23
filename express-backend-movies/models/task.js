const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 120
  },
  description : {
    type: String,
    required: false
  },
  taskType : {
    type: String,
    required: true,
    enum : ['Série', 'Filme', 'Livro'],     
  },
  dueDate : {
    type: Date ,
    default : Date.now()
  },
  poster : {
    type: String
  },
  season : {
    type: String
  },
  episode : {
    type : String
  }
});

const Task = mongoose.model('Task', taskSchema);


exports.taskSchema = taskSchema;
exports.Task = Task; 