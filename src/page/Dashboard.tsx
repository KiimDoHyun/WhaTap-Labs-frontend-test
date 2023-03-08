import Widget from "../component/Widget";
import { WidgetPropsType } from "../types/widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import DashboardProvider from "../store/DashboardProvider";
import { Col, Container, Row } from "react-bootstrap";
import WidgetProvider from "../store/WidgetProvider";
import { useState } from "react";
import useBoolean from "../hook/useBoolean";
import WidgetPropsSettingModal from "../component/Dashboard/WidgetPropsSettingModal";

const Dashboard = () => {
    const [widgetProps, setWidgetProps] = useState<WidgetPropsType[]>([
        {
            chartType: "INFO",
            apiKey: {
                type: "spot",
                keys: ["act_agent", "inact_agent", "host", "cpucore"],
            },
        },
        {
            chartType: "BAR",
            apiKey: {
                type: "spot",
                keys: [
                    "act_method",
                    "act_sql",
                    "act_httpc",
                    "act_dbc",
                    "act_socket",
                ],
            },
        },
        {
            chartType: "LINE",
            apiKey: {
                type: "spot",
                keys: ["cpu"],
            },
        },
        {
            chartType: "LINE",
            apiKey: {
                type: "spot",
                keys: ["cpu"],
            },
        },
    ]);

    const {
        state: activeWidgetSettingModal,
        setTrue,
        setFalse,
    } = useBoolean(false);

    return (
        <DashboardProvider>
            <DashboardBox>
                <DashboardHeader setTrue={setTrue} />

                {/* 위젯 설정 모달? */}
                <WidgetPropsSettingModal
                    avtiveValue={activeWidgetSettingModal}
                    setFalse={setFalse}
                    widgetProps={widgetProps}
                    setWidgetProps={setWidgetProps}
                />

                <WidgetProvider>
                    <Container>
                        <Row>
                            {widgetProps.map((item, idx) => (
                                <Col sm={12} md={6} lg={4}>
                                    <Widget
                                        key={`${item.chartType}${idx}`}
                                        {...item}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </WidgetProvider>
            </DashboardBox>
        </DashboardProvider>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
