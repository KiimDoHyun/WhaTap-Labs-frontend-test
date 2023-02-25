import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const queue = [];

let isWorking = false;

// 체크: 0.1초 단위
// 0.01초 단위로 하면 에러 발생
// 이전 호출이 종료되고 호출 되어야 함.
const apiManager = () => {
    setInterval(async () => {
        if (queue.length > 0 && isWorking === false) {
            try {
                isWorking = true;
                const result = await queue[0].callApi();
                queue[0].success(result.data);
            } catch (e) {
                console.log(e);
                console.log("에러 발생", queue);
                if (queue.length > 0) {
                    queue[0].fail();
                }
            } finally {
                isWorking = false;
                queue.shift();
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
