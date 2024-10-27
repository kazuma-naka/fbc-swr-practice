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

function lottieAnimation(type) {
  let animationData = "load";
  if (type === "load") {
    animationData = loadingAnimation;
  } else if (type === "success") {
    animationData = successAnimation;
  } else if (type === "error") {
    animationData = errorAnimation;
  }
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={200}
      width={200}
    />
  );
}

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const { data, error } = useSWR(url, fetcher);
  return (
    <div className="container">
      {!data && !error && lottieAnimation("load")}
      {error && (
        <div className="error-parent">
          {lottieAnimation("error")}
          <p>Error: {error.message}</p>
        </div>
      )}
      {data && (
        <div className="success-parent">
          {lottieAnimation("success")}
          <p>Status: {data.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
