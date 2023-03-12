import React, { useContext, useEffect, useState } from "react";
import { Container, Modal, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import useGetApiList from "../../hook/useGetApiList";
import {
    WidgetPropsSettingModalSetterContext,
    WidgetPropsSettingModalStateContext,
} from "../../store/WidgetPropsSettingModalProvider";
import WidgetPropsButtons from "./WidgetPropsSettingModal/WidgetPropsButtons";
import WidgetPropsList from "./WidgetPropsSettingModal/WidgetPropsList";

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
        activeWidgetSettingModalValue: { chartType, apiKeys, type, widgetId },
    } = useContext(WidgetPropsSettingModalStateContext);

    const { setFalse } = useContext(WidgetPropsSettingModalSetterContext);

    const { apiList: useableApiList } = useGetApiList();

    const [selectedChartType, setSelectedChartType] = useState([]);
    const [selectedApiKeys, setSelectedApiKeys] = useState([]);

    useEffect(() => {
        if (activeWidgetSettingModal) {
            setSelectedApiKeys(apiKeys.keys);
            setSelectedChartType([chartType]);
        } else {
            setSelectedChartType([]);
            setSelectedApiKeys([]);
        }
    }, [chartType, apiKeys, activeWidgetSettingModal]);

    return (
        <>
            <Modal
                show={activeWidgetSettingModal}
                onHide={setFalse}
                size={"lg"}
            >
                <ContainerBox>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <WidgetPropsList
                                    title={"차트 선택"}
                                    listItem={chartTypeList}
                                    selectedListItem={selectedChartType}
                                    setSelectedListItem={setSelectedChartType}
                                    isMultiSelect={false}
                                />
                            </Col>
                            <Col sm={8}>
                                <WidgetPropsList
                                    title={"데이터 선택"}
                                    listItem={useableApiList}
                                    selectedListItem={selectedApiKeys}
                                    setSelectedListItem={setSelectedApiKeys}
                                    isMultiSelect={true}
                                />
                            </Col>
                        </Row>
                    </Container>
                </ContainerBox>
                <WidgetPropsButtons
                    selectedChartType={selectedChartType}
                    selectedApiKeys={selectedApiKeys}
                    type={type}
                    widgetId={widgetId}
                    setFalse={setFalse}
                />
            </Modal>
        </>
    );
};

const ContainerBox = styled.div`
    padding: 20px;
    box-sizing: border-box;
`;
export default WidgetPropsSettingModal;
