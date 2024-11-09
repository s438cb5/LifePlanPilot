import { useEffect, useState } from "react";
import { Versions } from "./typings/renderer";

function App() {
  const [count, setCount] = useState(0);
  const [versions, setVersions] = useState<Versions | null>();

  useEffect(() => {
    const fetchVersions = async () => {
      const versions = await window.api.getVersions();
      setVersions(versions);
    };

    fetchVersions();
  }, []);

  if (!versions) return null;
  return (
    <>
      <h1>hello</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <ul>
        {Object.entries(versions).map(([k, v]) => (
          <li key={k}>
            {k}: {v}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
