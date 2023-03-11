import Widget from "../component/Widget";
import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
// import DashboardProvider from "../store/DashboardProvider";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import WidgetPropsSettingModal from "../component/Widget/WidgetPropsSettingModal";
import { WidgetStateContext } from "../store/WidgetProvider";

const WidgetWrapper = () => {
    const { widgetProps } = useContext(WidgetStateContext);

    return (
        <>
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
        <DashboardBox>
            <DashboardHeader />

            <WidgetWrapper />
        </DashboardBox>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
