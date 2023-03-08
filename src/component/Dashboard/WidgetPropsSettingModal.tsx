import React, { useContext, useEffect, useMemo, useState } from "react";
import { Container, ListGroup, Modal, Row, Col, Button } from "react-bootstrap";
import { OPEN_API } from "../../api";
import {
    WidgetPropsSettingModalSetterContext,
    WidgetPropsSettingModalStateContext,
    WidgetSetterContext,
} from "../../store/WidgetProvider";

const chartTypeList = [
    {
        key: "BAR",
        name: "바 차트",
    },
    {
        key: "LINE",
        name: "라인 차트",
    },
    {
        key: "INFO",
        name: "인포매틱스 차트",
    },
];

const WidgetPropsSettingModal = () => {
    const {
        activeWidgetSettingModal,
        activeWidgetSettingModalValue: { type, chartType, apiKeys, widgetId },
    } = useContext(WidgetPropsSettingModalStateContext);

    const { setFalse } = useContext(WidgetPropsSettingModalSetterContext);

    const { setWidgetProps } = useContext(WidgetSetterContext);
    const useableApiList = useMemo(() => {
        const array = [];

        for (const key in OPEN_API[""]) {
            if (Object.prototype.hasOwnProperty.call(OPEN_API[""], key)) {
                const element = OPEN_API[""][key];

                array.push({ key: key, name: element });
            }
        }
        return array;
    }, [OPEN_API]);

    const [selectedChartType, setSelectedChartType] = useState("");

    useEffect(() => {
        setSelectedChartType(chartType);
    }, [chartType]);

    const [selectedApiKeys, setSelectedApiKeys] = useState([]);

    useEffect(() => {
        setSelectedApiKeys(apiKeys.keys);
    }, [apiKeys]);

    const onClickChartTypeList = (item: string) => {
        setSelectedChartType(item);
    };

    const onClickApiKeyList = (item: string) => {
        setSelectedApiKeys((selectedApiKeys: any) => {
            const filterd = selectedApiKeys.filter(
                (filterItem: any) => filterItem !== item
            );

            if (filterd.length === selectedApiKeys.length) {
                return [...selectedApiKeys, item];
            } else return filterd;
        });
    };
    /*
    위젯 추가
    - api 리트스, 차트 리스트를 보여주고 선택해서 추가하도록 한다

    위젯 삭제 -> 각 위젯에서 수행한다.
    위젯 수정(api, chartType, 순서?) -> 각 위젯에서 수행한다.
    */

    const onClickConfirm = () => {
        /*
        type: ADD -> 추가
        type: MODI -> 수정
        */
        switch (type) {
            case "ADD":
                if (window.confirm("추가하시겠습니까?")) {
                    setWidgetProps((widgetProps: any) => [
                        ...widgetProps,
                        {
                            widgetId: Math.random(),
                            chartType: selectedChartType,
                            apiKey: {
                                type: "spot",
                                keys: selectedApiKeys,
                            },
                        },
                    ]);
                    setFalse();
                }
                break;
            case "MODI":
                if (window.confirm("수정하시겠습니까?")) {
                    setWidgetProps((widgetProps: any) =>
                        widgetProps.map((mapItem: any) =>
                            mapItem.widgetId === widgetId
                                ? {
                                      ...mapItem,
                                      chartType: selectedChartType,
                                      apiKey: {
                                          ...mapItem.apiKey,
                                          keys: selectedApiKeys,
                                      },
                                  }
                                : mapItem
                        )
                    );
                    setFalse();
                }
                break;

            default:
                break;
        }

        // 추가
    };

    return (
        <>
            <Modal
                show={activeWidgetSettingModal}
                onHide={setFalse}
                size={"lg"}
            >
                <div style={{ padding: "20px", boxSizing: "border-box" }}>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <h2>차트 선택</h2>
                                <div
                                    style={{
                                        height: "500px",
                                        overflowY: "auto",
                                    }}
                                >
                                    <ListGroup>
                                        {chartTypeList.map((item) => (
                                            <ListGroup.Item
                                                key={item.key}
                                                action
                                                active={
                                                    item.key ===
                                                    selectedChartType
                                                }
                                                onClick={() =>
                                                    onClickChartTypeList(
                                                        item.key
                                                    )
                                                }
                                            >
                                                {item.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            </Col>
                            <Col sm={8}>
                                <h2>데이터 선택</h2>
                                <div
                                    style={{
                                        height: "500px",
                                        overflowY: "auto",
                                    }}
                                >
                                    <ListGroup>
                                        {useableApiList.map((item) => (
                                            <ListGroup.Item
                                                key={item.key}
                                                action
                                                active={selectedApiKeys.some(
                                                    (findItem: any) =>
                                                        findItem === item.key
                                                )}
                                                onClick={() =>
                                                    onClickApiKeyList(item.key)
                                                }
                                            >
                                                {item.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Button onClick={setFalse}>취소</Button>
                    <Button onClick={onClickConfirm}>확인</Button>
                </div>
            </Modal>
        </>
    );
};

export default WidgetPropsSettingModal;
