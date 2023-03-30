import React , { useContext }from 'react'
import todoContext from '../context/todos/todoContext';

const TodoItem = (props) => {

    const context=useContext(todoContext);
    const {deleteTodo}=context;
    const { todo,updateTodo } = props;
    return (
           <div className='col-md-3'>
             <div className="card my-3" style={{"width": "18rem"}}>
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                    <h5 className="card-title">{todo.title}</h5>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateTodo(todo)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteTodo(todo._id)}}></i>
                    </div>
                    <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input border border-secondary" id="exampleCheck1" />
                        </div>
                    <p className="card-text">{todo.description}</p>
                    <p className="card-text">created on {(todo.date.split("T")[0])}</p>
                    <p className="card-text">Due By:{(todo.duedate)}</p>
                    <p className="card-text">Priority:{(todo.priority)}</p>
                    
                </div>
            </div>
           </div>

    )
}

export default TodoItem
