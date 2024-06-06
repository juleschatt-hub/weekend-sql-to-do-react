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
const [newTodoDueDate, setNewTodoDuedate] = useState();
const [newTodoIsComplete, setNewTodoIsComplete] = useState();

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
    setNewTodoIsComplete();
  })
  .catch((error) => {
    console.log('failed to post new TODO:', error);
  })
} //END addTodo

  return (
    <>
      <header>
        <h1>TO DO APP</h1>
        {JSON.stringify(toDoArray)}
      </header>
      
      <main>
        <h2>Create a Todo</h2>
        <form onSubmit={addToDo}>
          <label htmlFor="taskTitle">Task Title:</label>
          <input id="taskTitle" onChange={(event) => setNewTodoTitle(event.target.value)} value={newTodoTitle} />

          <label htmlFor="description">Task Description:</label>
          <input id="description" onChange={(event) => setNewTodoDescription(event.target.value)} value={newTodoDescription} />

          <label htmlFor="dueDate">Complete By:</label>
          <input id="dueDate" onChange={(event) => setNewTodoDuedate(event.target.value)} value={newTodoDueDate} />

          {/* <label htmlFor="taskTitle">Task Title:</label>
          <input id="taskTitle" onChange={(event) => setNewTodoTitle(event.target.value)} value={newTodoTitle} />
 */}



          
          <button type="submit">Add new TODO</button>

        </form>
        <div id="todo-card">
        
          {toDoArray.map((todo) => { return (
          <>
            <h2 key={todo.id}>{todo.task_title}</h2>
            <p>{todo.description}</p>
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
