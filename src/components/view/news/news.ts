import './news.css';
import type { Article } from '../../../types/news-api';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        if (!newsItemTemp) {
            console.error('Template #newsItemTemp not found');
            return;
        }
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const altNode = newsClone.querySelector('.news__item');
            if (idx % 2 && altNode) altNode.classList.add('alt');
            const photoNode = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photoNode) {
                photoNode.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            const authorNode = newsClone.querySelector('.news__meta-author');
            if (authorNode) {
                authorNode.textContent = item.author || item.source.name;
            }
            const dateNode = newsClone.querySelector('.news__meta-date');
            if (dateNode) {
                dateNode.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            const titleNode = newsClone.querySelector('.news__description-title');
            if (titleNode) titleNode.textContent = item.title;
            const sourceNode = newsClone.querySelector('.news__description-source');
            if (sourceNode) sourceNode.textContent = item.source.name;
            const contentNode = newsClone.querySelector('.news__description-content');
            if (contentNode) contentNode.textContent = item.description;

            const linkNode = newsClone.querySelector('.news__read-more a');
            if (linkNode) linkNode.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
