import React, { useMemo, useState } from "react";
import { Container, ListGroup, Modal, Row, Col } from "react-bootstrap";
import { OPEN_API } from "../../api";

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

const WidgetPropsSettingModal = ({
    avtiveValue,
    setFalse,
    widgetProps,
    setWidgetProps,
}: any) => {
    const useableApiList = useMemo(() => {
        console.log("OPEN_API: ", OPEN_API);
        const array = [];

        for (const key in OPEN_API[""]) {
            if (Object.prototype.hasOwnProperty.call(OPEN_API[""], key)) {
                const element = OPEN_API[""][key];

                array.push({ key: key, name: element });
            }
        }
        return array;
    }, [OPEN_API]);

    const [selctedChartType, setSelectedChartType] = useState("");

    const onClickChartTypeList = (item: string) => {
        setSelectedChartType(item);
    };
    /*
    위젯 추가
    - api 리트스, 차트 리스트를 보여주고 선택해서 추가하도록 한다

    위젯 삭제 -> 각 위젯에서 수행한다.
    위젯 수정(api, chartType, 순서?) -> 각 위젯에서 수행한다.
    */
    return (
        <>
            <Modal show={avtiveValue} onHide={setFalse} size={"lg"}>
                <Container>
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                {chartTypeList.map((item) => (
                                    <ListGroup.Item
                                        key={item.key}
                                        action
                                        active={item.key === selctedChartType}
                                        onClick={() =>
                                            onClickChartTypeList(item.key)
                                        }
                                    >
                                        {item.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <ListGroup>
                                {useableApiList.map((item) => (
                                    <ListGroup.Item key={item.key} action>
                                        {item.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    );
};

export default WidgetPropsSettingModal;
