import React, { useState } from "react";

type initialValueType = any;

const useInput = (initialValue: initialValueType) => {
    const [input, setInput] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        if (typeof initialValue === "string") {
            setInput(value);
        } else if (typeof initialValue === "number") {
            setInput(Number(value));
        }
    };

    return { input, onChange, setInput };
};

export default useInput;
