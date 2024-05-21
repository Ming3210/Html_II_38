import React, { useReducer, useState } from 'react'
interface Todo {
    id:number,
    name:string,
    status:boolean,
}

export default function UseReducerAdvance() {
    const [getId,setGetId]= useState<number>(0)
    const [active,setActive] = useState<boolean>(false)
    /*
        thực hành làm todoList dùng useReducer

    */
   // Khai báo state trước
   const initial = {
    todos:[],
    isLoading:false,
    todo: {
        id:0,
        name:"",
        status:false,
    },
   }
   // Khởi tạo hàm tạo action
   const action =(type:string,payload:any)=>{
    return{
        type:type,
        payload:payload,
    }
   }
   // Khởi tạo hàm reducer
   const reducer = (state:any = initial,action:any) => {
    switch(action.type){
        case "CHANGE_INPUT":
            return {...state, todo:{...state.todo,name:action.payload}}
        case "ADD_TODO":    
            let id = state.todos.findIndex((todo: Todo) => todo.id === getId);
            if (id !== -1) {
                setActive(false)
                const editedTodos = [...state.todos];
                setGetId(0)
                editedTodos[id] = { ...editedTodos[id], name: state.todo.name };
                return { ...state, todos: editedTodos, todo: { ...initial.todo }};
            }        
            return {...state, todos:[...state.todos,{...action.payload,id:Math.floor(Math.random()*93939292019291929+new Date().getMilliseconds())}],
            todo:{...initial.todo}
            }
        case "REMOVE_TODO":
            return {
                ...state,
                todos: state.todos.filter((job:Todo) =>job.id!== action.payload)
            };
        case "EDIT_TODO":
            setActive(true)
            return state
        default:
            return state
    }
   }
   const [state,dispatch] = useReducer(reducer,initial)
   // hàm lấy gtri ô input
   const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    let inputValue = e.target.value
    dispatch(action("CHANGE_INPUT", inputValue))
   }
   // Hàm thêm công việc
   const addTodo=()=>{
    dispatch(action("ADD_TODO",state.todo))
    }
   const removeTodo=(id:number)=>{
    dispatch(action("REMOVE_TODO",id))
    
   }
   const editTodo=(id:number)=>{
    setGetId(id)
    dispatch(action("EDIT_TODO",id))
    
   }
  return (
    <div>
        UseReducerAdvance <br />
        <label htmlFor="">Nhập công việc</label>
        <input
        onChange={handleChange}
        type="text" /> <br />
        <button onClick={addTodo}>{active ? "Edit" : "Thêm công việc"}</button>
        <p>Danh sách công việc
           
        </p>
        <ul>
                {
                state.todos.map((item:Todo,index:number)=>{
                    return <li key={item.id}>{item.name}    <button onClick={()=>removeTodo(item.id)}>Delete</button>
                    <button onClick={()=>editTodo(item.id)}>Edit</button></li>
                })
                }
            </ul>
        
    </div>
  )
}
