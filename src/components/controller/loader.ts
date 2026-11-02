import type { Callback, LoaderOptions, RequestParams } from '../../types/types';
import { HttpMethod } from '../../types/types';

class Loader {
    protected readonly baseLink: string;
    protected readonly options: Readonly<LoaderOptions>;
    constructor(baseLink: string, options: Readonly<LoaderOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: HttpMethod, endpoint: string, callback: Callback<T>, options: LoaderOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
