import api from "../api";
import { DataType } from "../types/api";

interface createApiObjType {
    key: string;
    success: (data: DataType) => void;
    fail: () => void;
}
export const createApiObj = ({ key, success, fail }: createApiObjType) => {
    return {
        callApi: () => api.spot(key),
        success,
        fail,
    };
};
