import AppController from '../controller/controller';
import AppView from '../view/appView';
import type { EverythingResponse, SourcesResponse } from '../../types/news-api';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector('.sources');

        if (!sourcesContainer) {
            console.error('.sources container not found');
            return;
        }

        sourcesContainer.addEventListener('click', (e: Event) => {
            this.controller.getNews<EverythingResponse>(e as MouseEvent, (data) => this.view.drawNews(data));
        });

        this.controller.getSources<SourcesResponse>((data) => this.view.drawSources(data));
    }
}

export default App;
