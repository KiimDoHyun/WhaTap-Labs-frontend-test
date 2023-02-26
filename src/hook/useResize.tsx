import React, { RefObject, useState, useEffect } from "react";
import debounce from "lodash/debounce";

const useResize = (ref: RefObject<HTMLDivElement>) => {
    const [state, setState] = useState({ width: 0, height: 0 });

    useEffect(() => {
        /*
        resize 마다 이벤트를 발생시켜 svg를 매번 다시 그리면 요구되는 작업량이 많기 때문에
        debounce로 과도한 요청을 방지한다.

        디바운스 단위시간: 0.3초
        */
        const getSize = debounce(() => {
            if (!ref || !ref.current) {
                return;
            }
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;
            setState({
                width,
                height,
            });
        }, 300);

        window.addEventListener("resize", getSize);
        getSize();
        return () => window.removeEventListener("resize", getSize);
    }, [ref]);
    return state;
};

export default useResize;
