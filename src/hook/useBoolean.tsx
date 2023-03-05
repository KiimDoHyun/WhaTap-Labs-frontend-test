import { useCallback, useState } from "react";

interface UseBooleanOutputType {
    state: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
}

const useBoolean = (initialValue: boolean = true): UseBooleanOutputType => {
    const [state, setState] = useState(initialValue);

    const setTrue: () => void = useCallback(() => {
        setState(true);
    }, []);

    const setFalse = useCallback(() => {
        setState(false);
    }, []);

    const toggle = useCallback(() => {
        setState((prevState) => !prevState);
    }, []);

    return { state, setTrue, setFalse, toggle };
};

export default useBoolean;
