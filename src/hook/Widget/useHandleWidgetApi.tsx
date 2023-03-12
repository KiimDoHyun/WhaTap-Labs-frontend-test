import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { enqueueApi } from "../..";
import { getDateRange, parseDate } from "../../common/date";
import { DEFAULT_CALL_CYCLE } from "../../common/widget";
import { DashboardContext } from "../../store/DashboardProvider";
import { ChartApiReturnType } from "../../types/api";
import useGetApiList from "../useGetApiList";

interface useHandleWidgetApiPropsType {
    apiKey: { type: string; keys: string[] };
}

const useHandleWidgetApi = ({ apiKey }: useHandleWidgetApiPropsType) => {
    const [callApiObject] = useContext(DashboardContext);

    const { createApiObj, getApiName } = useGetApiList();

    // api 를 마지막으로 호출한 시간 1 (intervalCallback 에서만 사용)
    const [lastCallTime, setLastCallTime] = useState<Date>(null);

    // 호출 주기
    const callCycleRef = useRef(DEFAULT_CALL_CYCLE);

    // 차트에 사용할 데이터 2 (intervalCallback, 최초 useEffect 에서만 사용)
    const [dataSource, setDataSource] = useState<ChartApiReturnType[]>([]);

    // api 호출 관련 정보 3 (intervalCallback, Modal 에서 사용)
    const [apiInfo, setApiInfo] = useState({
        startDate: null,
        endDate: null,
        dif: 0,
        callCycle: DEFAULT_CALL_CYCLE,
    });

    // interval
    const interval = useRef(null);

    // setInterval 에서 수행할 콜백(api 호출)
    const intervalCallback = useCallback(
        (startDate: number, endDate: number) => {
            const { keys } = apiKey;

            // api 호출 관련 정보
            setApiInfo((prevApiInfo: any) => ({
                ...prevApiInfo,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dif: (endDate - startDate) / 1000,
            }));

            // 호출  api 등록
            keys.forEach((apiItem: any) => {
                const body = {
                    key: apiItem,
                    success: (data: ChartApiReturnType) => {
                        setDataSource((prev) =>
                            prev === null
                                ? [data]
                                : prev.map((item) =>
                                      item.key === apiItem ? data : item
                                  )
                        );
                    },
                    fail: () => console.warn("api호출에 실패했습니다."),
                };
                enqueueApi(createApiObj(body));
            });

            // 마지막 조회 시간 설정 (api를 호출했던 실제 시간)
            setLastCallTime(new Date(Date.now()));
        },
        [apiKey]
    );

    // 호출 주기 변경
    const onClickApplyCallCycle = (inputValue: number) => {
        if (window.confirm("호출 주기를 변경하시겠습니까?")) {
            // 호출 주기 변경
            callCycleRef.current = inputValue;

            setApiInfo((prevApiInfo: any) => ({
                ...prevApiInfo,
                callCycle: inputValue,
            }));

            if (callApiObject.status === "NOW") {
                // 기존 호출 interval 제거
                clearInterval(interval.current);

                // 호출이 활성화 되어있다면 재등록
                // 호출이 비활성화 되어있다면 호출 주기만 변경

                // 주기 변경후 재 등록 : status: NOW 인 경우
                interval.current = setInterval(() => {
                    const { startDate, endDate } = getDateRange(
                        callApiObject.nowBody.range
                    );

                    intervalCallback(startDate, endDate);
                }, callCycleRef.current * 1000);
            }
        }
    };

    // 호출할 key 배열이 변경되는 경우 dataSource를 이에맞게 변경/초기화 한다.
    useEffect(() => {
        setDataSource(
            apiKey.keys.map((item: string) => ({
                key: item,
                data: null,
                name: getApiName({ type: apiKey.type, key: item }),
            }))
        );
    }, [apiKey]);

    // api 호출 관리 로직
    useEffect(() => {
        const { status, pastBody, nowBody } = callApiObject;

        switch (status) {
            case "NOW":
                clearInterval(interval.current);
                // 조회 시작, 종료 시간 설정
                const { startDate, endDate } = getDateRange(nowBody.range);

                intervalCallback(startDate, endDate);

                interval.current = setInterval(() => {
                    const { startDate, endDate } = getDateRange(nowBody.range);

                    intervalCallback(startDate, endDate);
                }, callCycleRef.current * 1000);
                break;
            case "PAST":
                if (Object.keys(pastBody).length < 1) break;

                intervalCallback(
                    parseDate(pastBody.startDate),
                    parseDate(pastBody.endDate)
                );

                break;
            case "STOP":
                clearInterval(interval.current);
                break;

            default:
                break;
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [callApiObject, intervalCallback]);

    return {
        lastCallTime,
        dataSource,
        apiInfo,
        onClickApplyCallCycle,
    };
};

export default useHandleWidgetApi;
