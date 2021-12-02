const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  const { username } = req.headers;

  const user = users.find((user) => user.username === username);

  if(!user) {
    return res.status(400).json({ error: "User not found!"});


  };

  req.user = user;

  return next();
}

app.post('/users', (req, res) => {
  const { name, username } = req.body;

  const userAlreadyExists = users.some((user) => user.username === username);

  if(userAlreadyExists) {
    return res.status(400).json({ error: "User Already Exists"});
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: []
  })
  console.log(users);
  return res.status(201).send();

});

app.get('/todos', checksExistsUserAccount, (req, res) => {
  const { user } = req;
  return res.status(200).send(user.todos);
});

app.post('/todos', checksExistsUserAccount, (req, res) => {
  const { title, deadline } = req.body;

  const { user } = req;

  const tasks = {
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(tasks);
  

  return res.status(201).send();


});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aquijdjdjdjd
});

module.exports = app;
