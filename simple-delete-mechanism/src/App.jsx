import { use, useState } from "react";

function App() {
    const [people, setPeople] = useState([
    { id: 1, name: "Alice Johnson", salary: 65000, gender: "female" },
    { id: 2, name: "Bob Smith", salary: 72000, gender: "male" },
    { id: 3, name: "Carol Williams", salary: 68000, gender: "female" },
    { id: 4, name: "David Brown", salary: 75000, gender: "male" },
    { id: 5, name: "Emma Davis", salary: 70000, gender: "female" },
    { id: 6, name: "Frank Miller", salary: 63000, gender: "male" },
    { id: 7, name: "Grace Wilson", salary: 81000, gender: "female" },
    { id: 8, name: "Henry Moore", salary: 59000, gender: "male" },
    { id: 9, name: "Isabella Taylor", salary: 76000, gender: "female" },
    { id: 10, name: "Jack Anderson", salary: 67000, gender: "male" },
    { id: 11, name: "Karen Thomas", salary: 84000, gender: "female" },
    { id: 12, name: "Liam Jackson", salary: 71000, gender: "male" },
    { id: 13, name: "Mia White", salary: 69000, gender: "female" },
    { id: 14, name: "Noah Harris", salary: 78000, gender: "male" },
    { id: 15, name: "Olivia Martin", salary: 73000, gender: "female" }
    ]);

    function deletePerson(id) {
        setPeople(people.filter(person => person.id !== id));
    }

    const rows = [];    
    for (let i = 0; i < people.length; ++i) {
        rows.push(
            <tr key={people[i].id}>
                <td>{people[i].id}</td>
                <td>{people[i].name}</td>
                <td>{people[i].salary}</td>
                <td>{people[i].gender}</td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={() => 
                        deletePerson(people[i].id)
                    }>Delete</button>
                </td>
            </tr>
        )
    }
    return <>
    <div className="bg-dark min-vh-100 w-100 p-5">
        <table className="table table-dark table-striped table-hover">
            <thead className="table-dark">
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Salary</td>
                    <td>Gender</td>
                </tr>
            </thead>
            <tbody className="table-group-divided">
                {rows}
            </tbody>
        </table>
        </div>
    </>
}

export default App;