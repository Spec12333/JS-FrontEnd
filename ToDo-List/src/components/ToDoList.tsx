
import { AddToDo } from "./AddToDo"
import { FilterToDo } from "./FilterToDo"
import { List } from "./List"

export const ToDoList = () => {
    return (
        <main className="todo-app">
            <header className="todo-header">
                <div>
                    <span className="todo-label">PRODUCTIVITY</span>
                    <h1>My Tasks</h1>
                    <p>Keep track of everything you need to get done.</p>
                </div>

                <div className="task-count">
                    <span>Tasks</span>
                    <strong>Today</strong>
                </div>
            </header>

            <section className="todo-content">
                <AddToDo />
                <FilterToDo />
                <List 
                />
            </section>
        </main>
    )
}