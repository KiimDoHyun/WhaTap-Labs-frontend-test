import { DataType, OPEN_APIType } from "./types/api";

const DEMO_PROJECT_API_TOCKEN = "XGJHUSQZTI2AVIENWA27HI5V";
const DEMO_PROJECT_CODE = "5490";
const OPEN_API_HEADERS: HeadersInit = {
    "x-whatap-pcode": DEMO_PROJECT_CODE,
    "x-whatap-token": DEMO_PROJECT_API_TOCKEN,
};

const OPEN_API_ROOT = "https://api.whatap.io/open/api";

export const OPEN_API: OPEN_APIType = {
    "": {
        // 몇개 정해서 인포매틱스로?
        act_agent: "활성화 상태의 에이전트 수",
        inact_agent: "비활성화 상태의 에이전트 수",
        host: "호스트 수",
        cpucore: "호스트의 CPU 코어 합",

        // 트랜잭션 관련
        txcount: "트랜잭션 수",
        tps: "초당 트랜잭션 수",
        actx: "액티브 트랜잭션 수",

        // 기타
        user: "5분간 집계된 고유 사용자 수",
        rtime: "평균 응답 시간",
        cpu: "CPU 사용률",

        // 쓰레드 풀 관련
        threadpool_active: "쓰레드풀 활성 쓰레드 수",
        threadpool_queue: "쓰레드풀 큐잉 쓰레드 수",

        // DB 관련?
        dbc_count: "전체 DB Connection 수",
        dbc_active: "활성(Active) DB Connection 수",
        dbc_idle: "비활성(Idle) DB Connection 수",

        // Active 관련?
        act_method: "액티브 Method 수",
        act_sql: "액티브 SQL 수",
        act_httpc: "액티브 HTTP Call 수",
        act_dbc: "액티브 DB Connection 수",
        act_socket: "액티브 Socket 수",
    },

    // 하나 정해서 라인차트로
    json: {
        "exception/{stime}/{etime}": "Exception 발생",
        "sql/{stime}/{etime}": "SQL",
        "httpc/{stime}/{etime}": "HTTP 외부호출",
        "remote/{stime}/{etime}": "client IP",
        "transaction/{stime}/{etime}": "트랜잭션",
    },
};
const getPath = (url: string, param: any = {}) => {
    let path = url;
    for (let key in param) {
        path = path.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
    }

    return path;
};

const getOpenApi = (type: string) => (key: string, param?: any) =>
    new Promise((resolve, reject) => {
        if (key in OPEN_API[type]) {
            return resolve({
                url: [OPEN_API_ROOT, type, key]
                    .filter((path) => !!path)
                    .join("/"),
                name: OPEN_API[type][key],
            });
        } else {
            reject("잘못된 API 정보");
        }
    }).then(({ url, name }: any) =>
        fetch(getPath(url, param), {
            headers: OPEN_API_HEADERS,
        })
            .then((response) => response.json())
            .then((data: DataType) => ({
                key,
                name,
                data,
            }))
    );

const spot = getOpenApi("");
const series = getOpenApi("json");

export default { spot, series };
