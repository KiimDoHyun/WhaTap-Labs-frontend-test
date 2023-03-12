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

export interface ChartDataSourceType {
    key: string;
    name: string;
    data: number | null;
}

export interface ChartApiReturnType {
    key: string;
    name: string;
    data: number | null;
}
