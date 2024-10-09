import Champion from "./Champion.js";

export class ChampModel {
    constructor() {
        this.champions = [];
    }

    async fetchChampion() {
        try {
            const result = await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json");
            const data = await result.json();
            const champions = data.data;

            const championPromises = Object.entries(champions).map(async ([name, champion]) => {
                const champResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion/${champion.id}.json`);
                const champData = await champResponse.json();
                const champ = new Champion(Object.entries(champData.data)[0][1]);
                this.loadChampions(champ);
            });

            await Promise.all(championPromises);

        } catch (error) {
            alert(`There is an error: ${error}`);
        }
    }

    loadChampions(champ) {
        this.champions.push(champ)
    }

    getAllChampions() {
        return this.champions;
    }
}
