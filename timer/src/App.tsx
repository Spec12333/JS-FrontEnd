import { useState } from "react";
import { Counter } from "./components/Counter";
import { Toaster } from "react-hot-toast";
import type { CounterData } from "./types/CounterData";
import { CounterList } from "./components/CounterList";
import "./App.css";

function App() {
  const [timers, setTimer] = useState<CounterData[]>([]);
  const createTimer = () => {
    const timerLength = Date.now();
    setTimer([
      ...timers,
      {
        TimerId: timerLength,
        StartTime: Date.now(),
        Completed: false,
        EndTime: null,
      },
    ]);
  };
  const deleteTime = (id: number) => {
    setTimer(timers.filter((timer) => timer.TimerId !== id));
  };
  const completeTime = (id: number) => {
    setTimer(
      timers.map((timer) => {
        if (timer.TimerId === id) {
          return {
            ...timer,
            Completed: true,
            EndTime: Date.now(),
          };
        }
        return timer;
      }),
    );
  };
  return (
    <main className="timer-app">
      <Toaster />
      <header className="app-header">
        <div>
          <p className="eyebrow">Focus session</p>
          <h1>Timer dashboard</h1>
          <p className="app-subtitle">
            Create and manage your countdowns in one calm workspace.
          </p>
        </div>
        <button className="add-timer-button" onClick={() => createTimer()}>
          <span aria-hidden="true">+</span>
          Add timer
        </button>
      </header>
      <section className="timers-section" aria-label="Active timers">
        {timers.map((timer) => (
          <Counter
            key={timer.TimerId}
            timer={timer}
            onDelete={deleteTime}
            onComplete={completeTime}
          />
        ))}
      </section>
      <section className="history-section" aria-label="Timer history">
        <CounterList timerArray={timers} />
      </section>
    </main>
  );
}

export default App;
