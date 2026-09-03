import type { CounterData } from "../types/CounterData";

type Props = {
    timerArray : CounterData[]
}

export const CounterList: React.FC<Props> = ({timerArray}) => {
    return (
        <div className="timer-history">
            <div className="history-heading">
                <div>
                    <p className="eyebrow">Overview</p>
                    <h2>Timer history</h2>
                </div>
            </div>
            <div className="table-scroll">
              <table>

            <thead>
                <tr>
                    <th>Timer Id</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Completed</th>
                </tr>
            </thead>

            <tbody>
                {
                    timerArray.map(timer => 
                        <tr key={timer.TimerId}>
                            <td>{timer.TimerId}</td>
                            <td>{new Date(timer.StartTime).toLocaleTimeString()}</td>
                            <td>{timer.EndTime ? new Date(timer.EndTime).toLocaleTimeString(): "-"}</td>
                            <td>{timer.Completed ? "Yes" : "No"}</td>
                        </tr>
                    )
                }
            </tbody>
              </table>
            </div>
        </div>
    )
}