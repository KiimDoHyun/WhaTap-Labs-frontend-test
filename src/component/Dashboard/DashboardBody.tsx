import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { WidgetStateContext } from "../../store/WidgetProvider";
import Widget from "../Widget/Widget";

const DashboardBody = () => {
    const { widgetProps } = useContext(WidgetStateContext);
    return (
        <>
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

export default DashboardBody;
