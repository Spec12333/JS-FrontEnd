import { useContext } from "react"
import { ToDoContext } from "../context/ToDoContext"

export const FilterToDo = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("Out of Provider")
    }

    return (
        <div className="filter">
            <button className={`filter-button ${context.filter === 'all' ? 'active' : ''}`} onClick={() => context.onFilterChange('all')}>
                All
            </button>

            <button className={`filter-button ${context.filter === 'active' ? 'active' : ''}`} onClick={() => context.onFilterChange('active')}>
                Active
            </button>

            <button className={`filter-button ${context.filter === 'completed' ? 'active' : ''}`} onClick={() => context.onFilterChange('completed')}>
                Completed
            </button>
        </div>
    )
}