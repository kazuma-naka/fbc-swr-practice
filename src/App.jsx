import useSWR from "swr";
import "./App.css";

const fetcher = (url) =>
  fetch(url, { headers: { Accept: "application/json" } }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP Error Status: ${res.status}`);
    }
    return res.json();
  });

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const { data, error } = useSWR(url, fetcher);
  if (!data && !error) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{data && <p>Status: {data.description}</p>}</div>;
}

export default App;
