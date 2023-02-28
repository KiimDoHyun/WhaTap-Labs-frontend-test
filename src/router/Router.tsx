import { Route, Routes } from "react-router-dom";
import Dashboard from "../page/Dashboard";

const Router = () => {
    return (
        <Routes>
            <Route element={<Dashboard />} path="/" />
        </Routes>
    );
};

export default Router;
