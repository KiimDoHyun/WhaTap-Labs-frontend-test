import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const arr = [];

// 체크: 0.1초 단위
// 0.01초 단위로 하면 에러 발생
// 이전 호출이 종료되고 호출 되어야 함.
const apiManager = () => {
    setInterval(async () => {
        if (arr.length > 0) {
            console.log("처리할 데이터가 존재합니다.", arr);
            console.log("대상: ", arr[0]);
            try {
                const result = await arr[0].callApi();
                arr[0].success(result.data);
            } catch (e) {
                console.log(e);
                console.log("에러 발생", arr);
                arr[0].fail();
            } finally {
                arr.shift();
            }
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
