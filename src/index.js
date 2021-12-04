const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  const { username } = req.headers;

  const usernameAlreadyExists = users.find((user) => user.username === username);

  if(!usernameAlreadyExists) {
    return res.status(404).json({ error: "Username not found!"});


  };

  req.user = usernameAlreadyExists;

  return next();
}

app.post('/users', (req, res) => {
  const { name, username } = req.body;
  

  const userAlreadyExists = users.find((user) => user.username === username);

  if(userAlreadyExists) {
    return res.status(400).json({ error: "User Already Exists"});
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }
  
  users.push(user);

  return res.status(201).json(user);

});

app.get('/todos', checksExistsUserAccount, (req, res) => {
  // const { user } = req;
  // return res.status(200).send(user.todos);
});

app.post('/todos', checksExistsUserAccount, (req, res) => {
  // const { title, deadline } = req.body;

  // const { user } = req;

  // const tasks = {
  //   title,
  //   done: false,
  //   deadline: new Date(deadline),
  //   created_at: new Date()
  // }

  // user.todos.push(tasks);
  

  // return res.status(201).send();


});

app.put('/todos/:id', checksExistsUserAccount, (req, res) => {
  // const { id } = req.params;
  // const { title, deadline } = req.body;
  // const { user } = req;

  // const todo = user.todos.find(todo => todo.id === id);

  // todo.title = title;
  // todo.deadline = new Date(deadline);

  // return res.status(201).send();
  
});

app.patch('/todos/:id/done', checksExistsUserAccount, (req, res) => {
  
});

app.delete('/todos/:id', checksExistsUserAccount, (req, res) => {
  
});

module.exports = app;
