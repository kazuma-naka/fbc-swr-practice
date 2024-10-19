import React from "react";
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
  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const successAnimationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const errorAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container">
      {!data && !error && (
        <Lottie options={loadingAnimationOptions} height={200} width={200} />
      )}
      {error && (
        <div className="error-parent">
          <Lottie options={errorAnimationOptions} height={200} width={200} />
          <p>Error: {error.message}</p>
        </div>
      )}
      {data && (
        <div className="success-parent">
          <Lottie options={successAnimationOptions} height={200} width={200} />
          <p>Status: {data.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
