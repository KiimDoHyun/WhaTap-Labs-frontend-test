import styled from "styled-components";
import DashboardHeader from "../component/Dashboard/DashboardHeader";
import DashboardBody from "../component/Dashboard/DashboardBody";
import WidgetPropsSettingModal from "../component/Widget/WidgetPropsSettingModal";

const Dashboard = () => {
    return (
        <DashboardBox>
            <WidgetPropsSettingModal />

            <DashboardHeader />

            <DashboardBody />
        </DashboardBox>
    );
};

const DashboardBox = styled.div``;

export default Dashboard;
