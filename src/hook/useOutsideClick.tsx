import { useEffect, useRef } from "react";

const useOutsideClick = (callback: Function) => {
    const ref = useRef(null);
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (ref.current && !ref.current.contains(target)) {
                callback();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref]);

    return ref;
};

export default useOutsideClick;
