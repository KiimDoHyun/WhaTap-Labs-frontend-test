import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const queue = [];

export const enqueueApi = (item) => {
    queue.push(item);

    // startInterval();

    // queue에 아이템이 추가되면 interval을 시작한다.
    // queue가 비어있으면 interval을 종료한다.
    // 중간에 에러가 발생한다면?
};

/*
startInterval () {
    interval.run(queue);

    intervalCallback() {
        try {
            callApi()
        }
        catch {
            failApiList.push(failApi)
        }
        finally {
            queue.shift()
        }
    }


    if(failApiList.length > 0) {
        interval.run(failApiList)
    }
}
*/

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
        }
    }, 10);
};

apiManager();

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
