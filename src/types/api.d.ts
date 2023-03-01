interface ObjectKeyType {
    [key: string]: string;
}

export interface OPEN_APIType {
    "": ObjectKeyType;
    json: ObjectKeyType;
}

export interface DataType {
    key: string;
    name: string;
    data: number;
}
