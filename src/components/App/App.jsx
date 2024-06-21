import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';


function App () {

const [toDoArray, setTodoArray] = useState([]);

//GET TODOS FUNCTION
const fetchToDos = () => {
  axios.get('/api/todo')
    .then((response) => {
      console.log('getting todo array:', response.data);
      setTodoArray(response.data);

    })
    .catch((error) => {
      console.log('Error GETTING todos:', error);
    })
} //FetchToDos

useEffect(fetchToDos, []);

const [newTodoTitle, setNewTodoTitle] = useState('');
const [newTodoDescription, setNewTodoDescription] = useState('');
const [newTodoDueDate, setNewTodoDuedate] = useState('');
const [newTodoIsComplete, setNewTodoIsComplete] = useState(false);

//ADD NEW TODO FUNCTION
const addToDo = (event) => {
  event.preventDefault();

  axios.post('/api/todo', {
    taskTitle: newTodoTitle,
    description: newTodoDescription,
    dueDate: newTodoDueDate,
    isComplete: newTodoIsComplete

  })
  .then((response) => {
    console.log('TODO created:', response);
    fetchToDos();
    setNewTodoTitle('');
    setNewTodoDescription('');
    setNewTodoDuedate('');
    setNewTodoIsComplete(false);
  })
  .catch((error) => {
    console.log('failed to post new TODO:', error);
  })
} //END addTodo

//START delete todo
const deleteTodo = (id) => {
  axios.delete(`/api/todo/${id}`)
  .then((response) => {
    console.log('deleting todo worked:', response);
    fetchToDos();
  })
  .catch(function (error) {
    console.log(error);
  })
} //END Delete todo

  return (
    <>
      <header>
        <h1>TO DO APP</h1>
        
      </header>
      
      <main>
        <h2>Create a Todo</h2>
        <form onSubmit={addToDo}>
          <label htmlFor="taskTitle">Task Title:</label>
          <input id="taskTitle" type="text" onChange={(event) => setNewTodoTitle(event.target.value)} value={newTodoTitle} />

          <label htmlFor="description">Task Description:</label>
          <input id="description" type="text" onChange={(event) => setNewTodoDescription(event.target.value)} value={newTodoDescription} />

          <label htmlFor="dueDate">Complete By:</label>
          <input id="dueDate" type="date" onChange={(event) => setNewTodoDuedate(event.target.value)} value={newTodoDueDate} />

           
 



          
          <button type="submit">Add new TODO</button>

        </form>
        <div className="todos">
        
          {toDoArray.map((todo) => { return (
          <>
            <div className='todo-card'>
              <h2 key={todo.id}>{todo.task_title}</h2>
              <p>{todo.description}</p>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </>
          
          )})}
        </div>
        
      </main>
      <footer>
        
      </footer>
    </>
  
  );

}

export default App
