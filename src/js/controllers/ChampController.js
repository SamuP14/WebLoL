import { ChampModel } from "../models/ChampModel.js";
import { ChampView } from "../views/ChampView.js";

export class ChampController {
    constructor() {
        this.model = new ChampModel();
        this.view = new ChampView(this.model); // Pasa el modelo a la vista
        document
            .getElementById("logo")
            .addEventListener("click", () => this.init());
        document
            .getElementById("prevPage")
            .addEventListener("click", () => this.view.changePage(-1));
        document
            .getElementById("nextPage")
            .addEventListener("click", () => this.view.changePage(1));
    }

    async init() {
        this.view.showLoading();
        try {
            await this.model.loadChampions();
            this.view.hideLoading();
            this.view.displayChampions(this.model.getAllChampions());
            this.view.updatePaginationButtons();
        } catch (error) {
            console.error(error);
        }
    }
}
