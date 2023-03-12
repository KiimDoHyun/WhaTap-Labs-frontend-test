import { useCallback, useMemo } from "react";
import { OPEN_API, spot } from "../common/api";
import { ChartApiReturnType } from "../types/api";

interface createApiObjType {
    key: string;
    success: (data: ChartApiReturnType) => void;
    fail: () => void;
}

const useGetApiList = () => {
    const apiList = useMemo(() => {
        const array = [];
        for (const key in OPEN_API[""]) {
            if (Object.prototype.hasOwnProperty.call(OPEN_API[""], key)) {
                const element = OPEN_API[""][key];

                array.push({ key: key, name: element });
            }
        }

        return array;
    }, []);

    const getApiName = useCallback(
        ({ type, key }: { type: string; key: string }) => {
            return type === "spot" ? OPEN_API[""][key] : OPEN_API["json"][key];
        },
        []
    );

    const createApiObj = useCallback(
        ({ key, success, fail }: createApiObjType) => {
            return {
                callApi: () => spot(key),
                success,
                fail,
            };
        },
        []
    );

    return { apiList, getApiName, createApiObj };
};

export default useGetApiList;
