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
    <div>
      <header>
        <h1>TO DO APP</h1>
      </header>
      <main>
        <p>Here is the array:{JSON.stringify(toDoArray)}</p>
      </main>
      <footer>
        
      </footer>
    </div>
  
  );

}

export default App
