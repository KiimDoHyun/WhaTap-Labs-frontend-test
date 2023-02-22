import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const arr = [];

// 체크: 0.1초 단위
const apiManager = () => {
    setInterval(async () => {
        if (arr.length > 0) {
            console.log("처리할 데이터가 존재합니다.", arr);
            console.log("대상: ", arr[0]);
            try {
                const result = await arr[0].callApi();
                arr[0].success(result.data);
                arr.shift();
            } catch (e) {
                console.log(e);
                arr[0].fail();
            }
            console.log("처리완료", arr);
        }
    }, 100);
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
