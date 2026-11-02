import './sources.css';
import type { Source } from '../../../types/news-api';

class Sources {
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp not found');
            return;
        }

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameNode = sourceClone.querySelector('.source__item-name');
            if (nameNode) nameNode.textContent = item.name;

            const itemNode = sourceClone.querySelector('.source__item');
            if (itemNode && item.id) {
                itemNode.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
