
import { useContext } from "react"
import type { ToDoType } from "../context/types"
import { ToDoContext } from "../context/ToDoContext"

type Props = {
    todo: ToDoType
}

export const ToDoItem: React.FC<Props> = ({ todo }) => {
    const context = useContext(ToDoContext)

    if (!context) {
        throw new Error("Out of Provider")
    }

    return (
        <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <div className="todo-info">
                <div className="todo-status">
                    {todo.completed ? "✓" : ""}
                </div>

                <h3>{todo.title}</h3>
            </div>

            <div className="todo-actions">
                <button className="complete-button" onClick={() => context.onComplete(todo.id)}>
                    {todo.completed ? "Cancel" : "Complete"}
                </button>

                <button
                    className="delete-button"
                    onClick={() => context.onRemove(todo.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}