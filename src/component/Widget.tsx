import React, { useEffect } from "react";
import styled from "styled-components";
import { enqueueApi } from "..";
import api from "../api";
import { WidgetPropsType } from "../types/widget";

const Widget = ({ chartType, apiKey }: WidgetPropsType) => {
    console.log("apiKey: ", apiKey);
    console.log("chartType: ", chartType);

    const apiObj = (type: string) => {
        return {
            callApi: () => api.spot(type),
            success: () => console.log("api 호출에 성공했습니다.", type),
            fail: () => console.warn("api 호출에 실패했습니다."),
        };
    };

    useEffect(() => {
        for (const key in apiKey) {
            if (key === "spot") {
                apiKey[key].forEach((item) => {
                    setInterval(() => {
                        enqueueApi(apiObj(item));
                    }, 5000);
                    // apiObj(item);
                    // console.log("item: ", item);
                });
                console.log("spot 형");
            } else if (key === "series") {
                console.log("series 형");
            } else {
                console.log("정의되지 않은 api 타입");
            }
            // console.log("key: ", key);
            // console.log("aaa: ", apiKey[key]);
        }
    }, [apiKey]);
    /*
    어떤 차트를 사용할지
    조회할 api
    조회할 구간
    조회 정지. 시작

    위젯은 데이터 조회관련을 담당한다.

    차트 컴포넌트에 차트를 그리는데 필요한 데이터를 전달한다.
    */

    /*
    조회 시점 조절
    */
    return <WidgetBlock>Wiget</WidgetBlock>;
};

const WidgetBlock = styled.div``;
export default Widget;
