export type ApiStatus = 'ok' | 'error';

export interface Source {
    id: string | null;
    name: string;
    description: string | null;
    url: string | null;
    category: string | null;
    language: string | null;
    country: string | null;
}

export interface Article {
    source: Pick<Source, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: ApiStatus;
    sources: Source[];
}

export interface EverythingResponse {
    status: ApiStatus;
    totalResults: number;
    articles: Article[];
}
