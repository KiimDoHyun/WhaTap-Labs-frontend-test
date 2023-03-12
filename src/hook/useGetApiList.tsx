import { useMemo } from "react";
import { OPEN_API } from "../common/api";

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

    return apiList;
};

export default useGetApiList;
