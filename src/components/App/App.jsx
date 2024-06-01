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
      <h1>TO DO APP</h1>
      <p>
                    Here is the array:
                    {JSON.stringify(toDoArray)}
                </p>
    </div>
  );

}

export default App
