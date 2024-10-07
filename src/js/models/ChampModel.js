import Champion from "./Champion.js";

export class ChampModel {
    constructor() {
        this.champions = [];
    }

    async fetchChampion() {
        try {
            const result = await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json");
            const data = await result.json();
            const champions = data.data;

            return Object.values(champions).map(champ => new Champion(champ));

        } catch (error) {
            alert(`There is an error: ${error}`);
        }
    }

    async loadChampions() {
        const champions = await this.fetchChampion();
        if (champions) {
            this.champions = champions;
        }
    }

    getAllChampions() {
        return this.champions;
    }
}
