import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const arr = [];

let isWorking = false;

// 체크: 0.1초 단위
// 0.01초 단위로 하면 에러 발생
// 이전 호출이 종료되고 호출 되어야 함.
const apiManager = () => {
    setInterval(async () => {
        if (arr.length > 0 && isWorking === false) {
            try {
                isWorking = true;
                console.log(arr);
                const result = await arr[0].callApi();
                arr[0].success(result.data);
            } catch (e) {
                console.log(e);
                console.log("에러 발생", arr);
                if (arr.length > 0) {
                    arr[0].fail();
                }
            } finally {
                isWorking = false;
                arr.shift();
            }
        }
    }, 10);
};

apiManager();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
