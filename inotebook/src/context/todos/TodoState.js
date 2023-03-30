import { useState } from "react";
import todoContext from "./todoContext";


const TodoState = (props) => {
  const host = "http://localhost:5000"
  const todosInitial = []
  const [todos, setTodos] = useState(todosInitial)

  const getTodos = async () => {
    //Api call
    const response = await fetch(`${host}/api/todos/fetchalltodos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json()
    console.log(json)
    setTodos(json)
  }

  const addTodo = async (title, description, tag,duedate,priority) => {
    //Api call
    const response = await fetch(`${host}/api/todos/addtodos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag,duedate ,priority})
    });
    const json=await response.json();
    
    console.log(json)

    const note=json;
    setTodos(todos.concat(note))
  }


  const deleteTodo =async (id) => {

    const response = await fetch(`${host}/api/todos/deletetodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json =await response.json();
    console.log(json)
    const newTodo = todos.filter((todo) => { return todo._id !== id })
    setTodos(newTodo)
  }
  const editTodo = async (id, title, description, tag,duedate,priority) => {
    //Api call
    const response = await fetch(`${host}/api/todos/updatetodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag ,duedate,priority})
    });
    const json =await response.json();
    console.log(json)

    let newTodo=JSON.parse(JSON.stringify(todos))

    for (let i = 0; i < newTodo.length; i++) {
      const element = newTodo[i];
      if (element._id === id) {
        newTodo[i].title = title;
        newTodo[i].description = description;
        newTodo[i].tag = tag;
        newTodo[i].duedate = duedate;
        newTodo[i].priority = priority;
        break;
      }
     
    }
    setTodos(newTodo)
  }
  return (
    <todoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo,getTodos }}>
      {props.children}
    </todoContext.Provider>
  )
}


export default TodoState;