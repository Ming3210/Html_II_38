import React, { useReducer } from 'react'

export default function UseReducer() {
    // Khai báo giá trị khởi tạo
    const initial : number = 1
    const reducer =(state=initial,action:any)=>{
        switch (action.type) {
            case "INCREASE":
                return state+action.payload
            case "DECREASE":
                return state-action.payload
            default:
                return state
        }
    }
    // Đối với những action có dữ liệu phức tạp thì nên tạo ra 1 function
    const action = (type:string,payload:number)=>{
        return{
            type,
            payload
        }
    }
    // Dùng destructuring
    const [count,dispatch] = useReducer(reducer,initial)

    // Hàm xử lí tăng count
    const increase = ()=>{
        dispatch(action("INCREASE",2))
    }   
    // Hàm đii giảm count
    const decrease = ()=>{
        dispatch(action("INCREASE",5))
    } 
  return (
    <div>UseReducer
        {/*
        Là 1 hook 
        Sinh ra để làm gì ?
        1. Sinh ra để quản lí những state phức tạp
         + Khi muốn quản lí state thì thường dùng useState => Dùng để quản lí state đơn giản
         + Bản chất những gì useState làm đc thì use reducer cx làm đc nhưng nó sẽ xử lí những cái state phức tạp hơn
        
        2. Tiền đề sau này học redux (thư viện giúp tạo 1 kho chứa dữ liệu)

        Cách dùng ?
         + nó là 1 hook để dùng
        B1 : import nó vào
        B2 : useReducer(): Nhận vào 2 tham số
         1. Hàm reduce
         2. giá trị khởi tạo

        */}
        <p>Giá trị của count : {count}</p>
        <button onClick={increase}>Tăng</button>
        <button onClick={decrease}>Giảm</button>

    </div>
  )
}
