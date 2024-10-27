import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Lottie from "react-lottie";
import "./App.css";
import loadingAnimation from "./loading.json";
import successAnimation from "./success.json";
import errorAnimation from "./error.json";

const fetcher = (url) =>
  fetch(url, { headers: { Accept: "application/json" } }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  });

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const { data, error } = useSWR(url, fetcher);
  const [animationData, setAnimationData] = useState(loadingAnimation);
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (error) {
      setAnimationData(errorAnimation);
    } else if (data) {
      setAnimationData(successAnimation);
    }
  }, [data, error]);

  return (
    <div className="container">
      <Lottie options={options} height={200} width={200} />
      {error && (
        <div className="error-parent">
          <p>Error: {error.message}</p>
        </div>
      )}
      {data && (
        <div className="success-parent">
          <p>Status: {data.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
