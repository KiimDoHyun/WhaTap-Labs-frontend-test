import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import DashboardProvider from "../store/DashboardProvider";
import { Col, Container, Row } from "react-bootstrap";
import WidgetProvider, { WidgetStateContext } from "../store/WidgetProvider";
import { useContext, useState } from "react";
import useBoolean from "../hook/useBoolean";
import WidgetPropsSettingModal from "../component/Dashboard/WidgetPropsSettingModal";

const WidgetWrapper = () => {
    const { widgetProps } = useContext(WidgetStateContext);

    console.log("widgetProps: ", widgetProps);
    return (
        <>
            <div>hi</div>
            <WidgetPropsSettingModal />
            <Container>
                <Row>
                    {widgetProps.map((item: any, idx: any) => (
                        <Col sm={12} md={6} lg={4} key={item.widgetId}>
                            <Widget {...item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

const Dashboard = () => {
    return (
        <DashboardProvider>
            <DashboardBox>
                <WidgetProvider>
                    <DashboardHeader />

                    <WidgetWrapper />
                    {/* 위젯 설정 모달 */}
                    {/* <WidgetPropsSettingModal
                    avtiveValue={activeWidgetSettingModal}
                    setFalse={setFalse}
                    setWidgetProps={setWidgetProps}
                />
                    <Container>
                        <Row>
                            {widgetProps.map((item, idx) => (
                                <Col
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    key={`${item.chartType}${idx}`}
                                >
                                    <Widget {...item} />
                                </Col>
                            ))}
                        </Row>
                    </Container> */}
                </WidgetProvider>
            </DashboardBox>
        </DashboardProvider>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
