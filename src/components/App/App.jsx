import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';


function App () {

let [toDoArray, setTodoArray] = useState([]);


const fetchToDos = () => {
  axios.get('/api/todo')
    .then((response) => {
      console.log('getting todo array:', response.data);
      setTodoArray(response.data);

    })
    .catch((error) => {
      console.log('Error GETTING todos:', error);
    })
}

useEffect(fetchToDos, []);

  
  return (
    <>
      <header>
        <h1>TO DO APP</h1>
        {JSON.stringify(toDoArray)}
      </header>
      <main>
        
          {toDoArray.map((todo) => { return (
          <>
            <h2 key={todo.id}>{todo.task_title}</h2>
            <p key={todo.id}>{todo.description}</p>
          </>
          
          )})}
        
      </main>
      <footer>
        
      </footer>
    </>
  
  );

}

export default App
