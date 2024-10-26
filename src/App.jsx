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

const animationOption = (type) => {
  if (type === "load") {
    return {
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  } else if (type === "success") {
    return {
      loop: false,
      autoplay: true,
      animationData: successAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  } else if (type === "error") {
    return {
      loop: true,
      autoplay: true,
      animationData: errorAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  }
  return null;
};

function App() {
  const url = "https://httpstat.us/200?sleep=2000a";
  const { data, error } = useSWR(url, fetcher);
  return (
    <div className="container">
      {!data && !error && (
        <Lottie options={animationOption("load")} height={200} width={200} />
      )}
      {error && (
        <div className="error-parent">
          <Lottie options={animationOption("error")} height={200} width={200} />
          <p>Error: {error.message}</p>
        </div>
      )}
      {data && (
        <div className="success-parent">
          <Lottie
            options={animationOption("success")}
            height={200}
            width={200}
          />
          <p>Status: {data.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
