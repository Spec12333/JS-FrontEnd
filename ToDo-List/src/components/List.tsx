import { ToDoContext } from "../context/ToDoContext"
import { useContext } from "react"
import { ToDoItem } from "./ToDoItem"

export const List = () => {
    const context = useContext(ToDoContext)
    if (!context) {
        throw new Error("Out of provider")
    }

    const filteredToDos = context.todos.filter(todo => {
        if (context.filter === 'active') {
            return !todo.completed
        }
        if (context.filter === 'completed') {
            return todo.completed;
        }
        return true;
    })

    return (
        <div>
                {
                    filteredToDos.map(todo => 
                        <ToDoItem 
                        key={todo.id}
                        todo={todo}
                        />
                    )
                }
        </div>
    )
}