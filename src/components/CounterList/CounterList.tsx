import { useCallback, useState } from "react";
import Counter from "../Counter";

function CounterList() {
  const [counters, setCounters] = useState<string[]>([]);

  const handleAddCounter = useCallback(() => {
    setCounters((prevCounters) => [...prevCounters, crypto.randomUUID()]);
  }, []);

  const deleteCounter = useCallback((deleteId: string) => {
    setCounters((prevCounters) => prevCounters.filter((id) => id !== deleteId));
  }, []);

  return (
    <div>
      <button type="button" onClick={handleAddCounter}>
        Add counter
      </button>
      <ul>
        {counters.map((id, i) => (
          <li key={id}>
            <span>{i}</span>
            <Counter id={id} deleteCounter={deleteCounter} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CounterList;
