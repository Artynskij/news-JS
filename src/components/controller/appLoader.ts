import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const isProd = process.env.NODE_ENV === 'production';

        const baseLink = isProd
            ? 'https://rss-news-api.onrender.com/mocks/' // Продакшен (gh-pages): статичные данные
            : process.env.API_URL + '/'; // Локально: из .env файла

        const apiKey = isProd ? 'mock' : process.env.API_KEY || 'mock';

        super(baseLink, { apiKey });
    }
}

export default AppLoader;
