interface ObjectKeyType {
    [key: string]: string;
}

interface ObjectType {
    [key: string]: ObjectKeyType;
}

export interface OPEN_APIType extends ObjectType {
    "": ObjectKeyType;
    json: ObjectKeyType;
}

export interface DataType {
    key: string;
    name: string;
    data: number;
}
