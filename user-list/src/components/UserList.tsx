import type { UserData } from "../types/Types"

type Props = {
    users : UserData[]
}
export const UserList:React.FC<Props> = ({users}) => {

    return (
        <div>
            <h2>
                Users List
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => 
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.salary} $</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}