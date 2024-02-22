import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Counter.module.css";

type Props = {
  id: string;
  deleteCounter: (id: string) => void;
};

function Counter({ id, deleteCounter }: Props) {
  const timerRef = useRef(0);
  const [count, setCount] = useState(0);

  const stopCounter = useCallback(() => {
    window.clearInterval(timerRef.current);
  }, []);

  const startCounter = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  }, []);

  const handlePause = useCallback(() => {
    stopCounter();
  }, [stopCounter]);

  const handleStop = useCallback(() => {
    stopCounter();
    setCount(0);
  }, [stopCounter]);

  const handleStart = useCallback(() => {
    startCounter();
  }, [startCounter]);

  const handleDelete = useCallback(() => {
    deleteCounter(id);
  }, [deleteCounter, id]);

  useEffect(() => {
    handleStart();

    return () => {
      stopCounter();
    };
  }, [handleStart, stopCounter]);

  return (
    <div className={styles.counter}>
      <p>{count}</p>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Counter;
