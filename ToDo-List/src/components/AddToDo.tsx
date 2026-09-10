
import { useForm, type SubmitHandler } from "react-hook-form"
import type { ToDoType } from "../context/types"
import { useContext } from "react"
import { ToDoContext } from "../context/ToDoContext"

type ToDoDetails = Omit<ToDoType, 'id' | 'completed'>

export const AddToDo = () => {
    const context = useContext(ToDoContext)

    if (!context) {
        throw new Error("Out of Provider")
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ToDoDetails>()

    const handleAdd: SubmitHandler<ToDoDetails> = (data) => {
        context.onAdd(data.title)
        reset()
    }

    return (
        <form className="add-todo" onSubmit={handleSubmit(handleAdd)}>
            <div className="input-wrapper">
                <span className="input-icon">+</span>

                <input
                    type="text"
                    placeholder="What needs to be done?"
                    {...register("title", {
                        required: "Please enter the task"
                    })}
                />
            </div>

            <button className="add-button" type="submit">
                Add task
            </button>

            {errors.title && (
                <p className="error-message">
                    {errors.title.message}
                </p>
            )}
        </form>
    )
}