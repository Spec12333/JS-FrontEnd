import { useForm, type SubmitHandler } from "react-hook-form"
import type { UserData } from "../types/Types"

export type Account = Omit<UserData, "id">
type Props = {
    onAdd : (userData: Account) => void
}
export const AddUser:React.FC<Props> = ({onAdd}) => {
    const {register, handleSubmit, formState:{errors}} = useForm<Account>()
    
    const handleAdd:SubmitHandler<Account> = data => {
        onAdd(data)
    }
    
    return (
        <div>
            <h2>
                AddUser
            </h2>
            <form onSubmit={handleSubmit(handleAdd)}>
                <div>
                    {errors.name && <p>{errors.name.message}</p>}
                    <label htmlFor="user-name">Name</label>
                    <input 
                    id="user-name" 
                    type="text" 
                    {...register('name', {required : "Please Enter your Name"})}
                    />
                </div>
                <div>
                    {errors.surname && <p>{errors.surname.message}</p>}
                    <label htmlFor="user-surname">Surname</label>
                    <input 
                    id="user-surname" 
                    type="text"
                    {...register('surname', {required : "Please Enter your Surname"})} 
                    />
                </div>
                <div>
                    {errors.gender && <p>{errors.gender.message}</p>}
                    <label htmlFor="user-gender">Gender</label>
                    <select id="user-gender" defaultValue="" {...register('gender', {required : "Please Choose the Gende"})}>
                        <option value="" disabled>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    {errors.salary && <p>{errors.salary.message}</p>}
                    <label htmlFor="user-salary">Salary</label>
                    <input 
                    id="user-salary" 
                    type="text"
                    {...register('salary', 
                        {
                            required : "Please Enter your Salary", 
                            min : {value : 50000, message : "Your salary shoud not be lower than 50000"}, 
                            max : {value : 500000, message : "Your salary shoud not be higher than 500000"},
                            setValueAs : (p:string) => +p,
                        })
                    } 
                    />
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}
