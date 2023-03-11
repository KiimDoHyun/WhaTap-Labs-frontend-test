import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./store";

const queue = [];

let interval = null;

let isWorking = false;

const clearApiInterval = () => {
    clearInterval(interval);
};

export const enqueueApi = (item) => {
    // 등록
    if (queue.length === 0) {
        queue.push(item);

        interval = setInterval(async () => {
            if (queue.length > 0 && isWorking === false) {
                try {
                    isWorking = true;
                    const result = await queue[0].callApi();
                    queue[0].success(result);
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
            } else if (queue.length === 0) {
                clearApiInterval();
            }
        }, 10);
    } else {
        queue.push(item);
    }
};

ReactDOM.render(
    <React.StrictMode>
        <GlobalProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
