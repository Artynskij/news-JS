export type Callback<T> = (data: T) => void;

export interface LoaderOptions {
    [key: string]: string | number | boolean | undefined;
}

export interface RequestParams {
    endpoint: string;
    options?: LoaderOptions;
}
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}
