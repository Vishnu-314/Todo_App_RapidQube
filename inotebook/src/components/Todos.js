import React, { useContext, useEffect, useRef ,useState} from 'react'
import todoContext from '../context/todos/todoContext';
import Addtodo from './Addtodo';
import TodoItem from './TodoItem';
import { useNavigate } from 'react-router-dom';
const Todos = (props) => {
    const context = useContext(todoContext);
    let history=useNavigate()
    const { todos, getTodos,editTodo } = context;
    useEffect(() => {
       if(localStorage.getItem('token')){
        getTodos()
       }else{
        history("/login")
       }
        //eslint-disable-next-line
    }, [])
    const [todo,setTodo]=useState({id:"",etitle:"",edescription:"",etag:"General",eduedate:"",epriority:""})
    const updateTodo = (currentTodo) => {
        ref.current.click()
        setTodo({id:currentTodo._id, etitle:currentTodo.title,edescription:currentTodo.description,etag:currentTodo.tag,eduedate:currentTodo.duedate,epriority:currentTodo.priority})
    }
    const ref = useRef(null)
    const refClose = useRef(null)
    const handleClick=()=>{
        editTodo(todo.id,todo.etitle,todo.edescription,todo.etag,todo.eduedate,todo.epriority)
        refClose.current.click()
      }
      const onChange=(e)=>{
            setTodo({...todo,[e.target.name]:e.target.value})
      }
    return (
        <>
            <Addtodo />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={todo.etitle
                                    } className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={todo.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" value={todo.etag
                                    } className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eduedate" className="form-label">Duedate</label>
                                    <input type="text" value={todo.eduedate
                                    } className="form-control" id="eduedate" name='eduedate' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="epriority" className="form-label">Priority</label>
                                    <input type="text" value={todo.epriority
                                    } className="form-control" id="epriority" name='epriority' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={todo.etitle.length<5 || todo.edescription.length<5} onClick={handleClick
                            }  type="button" className="btn btn-primary">Update Todo</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Todos</h2>
               <div className='container'>
               {todos.length===0 && "No Todos To Display"}
               </div>
                {todos.map((todo) => {
                    return <TodoItem key={todo._id} updateTodo={updateTodo} todo={todo} />;
                })}
            </div>
        </>
    )
}

export default Todos
