import { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🚀 React Counter</h1>

        <h2 className="count">{count}</h2>

        <div className="buttons">
          <button className="btn increase" onClick={() => setCount(count + 1)}>
            Increase
          </button>

          <button className="btn decrease" onClick={() => setCount(count - 1)}>
            Decrease
          </button>

          <button className="btn reset" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>

        <p className="footer">React + TypeScript Counter</p>
      </div>
    </div>
  );
};

export default App;