import { useState, useEffect, type ReactNode } from "react"
import { ToDoContext } from "./ToDoContext"
import type { FilterType, ToDoType } from "./types"
import axios from "axios"

type Props = {
    children : ReactNode 
}

export const ToDoContextProvider:React.FC<Props> = ({children}) => {
    const [todos, setToDos] = useState<ToDoType[]>([])
    const [filter, setFilter] = useState<FilterType>('all')
    useEffect(() => {
        axios
        .get<ToDoType[]>('http://localhost:4000/todos')
        .then(response => {
          setToDos(response.data)
        })
    }, [])

    const FilterChange = (newFilter : FilterType) => {
        setFilter(newFilter)
    }
    const AddToDo = (title:string) => {
        const exists = todos.some(todo => 
            todo.title.toLowerCase() === title.toLowerCase()
        )

        if (exists) {
            return;
        }

        const newTodo = { id : Date.now(), title, completed: false} 
        axios 
        .post<ToDoType>("http://localhost:4000/todos", newTodo)
        .then((response) => {
            setToDos((prevTodos) => [...prevTodos, response.data]) 
        })
    }


    const removeToDo = (id : number) => {
        setToDos(todos.filter(todo => todo.id !== id))
        axios
        .delete(`http://localhost:4000/todos/${id}`)
    }

    const completeToDo = (id : number) => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return;
        }
        axios
        .patch(`http://localhost:4000/todos/${id}`, {completed : !todo.completed})
        .then(response => 
            setToDos(todos.map(todo =>
                todo.id === id ? response.data : todo
            ))
        )
    } 

    return (
        <ToDoContext.Provider value={{todos, onRemove : removeToDo, onAdd : AddToDo, onComplete : completeToDo, onFilterChange : FilterChange, filter}}>
            {children}
        </ToDoContext.Provider>
    )
}