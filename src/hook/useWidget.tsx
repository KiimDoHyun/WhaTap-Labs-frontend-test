import React, { useContext } from "react";
import { DashboardContext } from "../store/DashboardProvider";

const useWidget = () => {
    const [callApiObject] = useContext(DashboardContext);

    return <>useWidget</>;
};

export default useWidget;
