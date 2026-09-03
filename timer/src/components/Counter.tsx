import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { CounterData } from "../types/CounterData";

type Props = {
  timer: CounterData;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

export const Counter: React.FC<Props> = ({ timer, onDelete, onComplete }) => {
  const [counter, setCount] = useState(600);
  const [isPaused, setPause] = useState(false);
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const interval = setInterval(() => {
      setCount((counter) => {
        if (counter === 1) {
          clearInterval(interval);
          onComplete(timer.TimerId);
          toast.success(`The timer ${timer.TimerId} is over`);
          return 0;
        } else {
          return counter - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, timer.TimerId]);
  return (
    <article className={`timer-card ${isPaused ? "is-paused" : ""}`}>
      <div className="timer-card__heading">
        <span className="timer-status">
          <i aria-hidden="true" />
          {isPaused ? "Paused" : "Running"}
        </span>
        <span className="timer-id">#{timer.TimerId}</span>
      </div>
      <div
        className="timer-display"
        aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
      >
        {String(minutes).padStart(2, "0")}
        <span>:</span>
        {String(seconds).padStart(2, "0")}
      </div>
      <div className="timer-actions">
        <button
          className="timer-button timer-button--primary"
          onClick={() => setPause(!isPaused)}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <button
          className="timer-button"
          onClick={() => {
            setCount(600);
            setPause(false);
          }}
        >
          Stop
        </button>
        <button
          className="timer-button timer-button--delete"
          onClick={() => onDelete(timer.TimerId)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};
