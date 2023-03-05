import React, { createContext, useState } from "react";
import { createDateObj, getDateRange } from "../common/date";

export const DashboardContext = createContext(null);

const DEFAULT_RANGE = 10;

interface ProviderPropsType {
    children: React.ReactNode;
}

const DashboardProvider = ({ children }: ProviderPropsType) => {
    const { startDate, endDate } = getDateRange();

    const [callApiObject, setCallApiObject] = useState({
        status: "NOW", // NOW: 실시간 / PAST : 과거(특정 구간) / STOP: 정지
        pastBody: {
            startDate: createDateObj(new Date(startDate)),
            endDate: createDateObj(new Date(endDate)),
        },
        nowBody: { range: DEFAULT_RANGE },
    });

    return (
        <DashboardContext.Provider value={[callApiObject, setCallApiObject]}>
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;
