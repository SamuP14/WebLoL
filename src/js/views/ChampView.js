export class ChampView {
    constructor(model) {
        this.model = model;
        this.champions = [];
        this.loldex = document.getElementById("loldex");
        this.loadingMessage = document.querySelector(".loading");
        this.pagination = document.querySelector(".pagination");
        this.currentPage = 0;
        this.itemsPerPage = 8;
        this.currentSkin = 0;
    }

    showLoading() {
        this.loadingMessage.style.visibility = "visible";
        this.pagination.style.visibility = "visible";
        this.loldex.style.visibility = "hidden";
    }

    hideLoading() {
        document.getElementById('logo').style.pointerEvents = 'none';
        this.loadingMessage.style.visibility = "hidden";
        this.loldex.style.visibility = "visible";
    }

    displayChampions(champions) {
        const startIndex = this.currentPage * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const championsToDisplay = champions.slice(startIndex, endIndex);
        this.loldex.innerHTML = "";
        championsToDisplay.forEach(champion => {
            const champCard = document.createElement("div");
            champCard.classList.add("card");
            champCard.id = `champion-${champion.id}`;
            champCard.innerHTML = `
                <div class="cardTop">
                    <div class="name">
                        ${champion.name}, ${champion.title}
                    </div>
                </div>
                <img class="champImg" src="https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.img}">
            `;
            champCard.addEventListener("click", () => {
                this.showChampionPopup(champion);
            });
            this.loldex.appendChild(champCard);
        });
    }

    showChampionPopup(champion) {
        const popup = document.getElementById("champion-popup");
        const championInfo = document.getElementById("champion-info");
        const roleLabel = champion.tags.length > 1 ? 'Roles' : 'Role';
        this.currentSkin = 0;
        const skinImgs = champion.skins.map(skin => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`)
        
        championInfo.innerHTML = `
            <h2>${champion.name}, ${champion.title}</h2>
            <div class="skins">
                <img src="${skinImgs[this.currentSkin]}" class="splash">
                <button id="prevSkin">&lt--</button>
                <button id="nextSkin">--&gt</button>
                <div id="skinNameDisplay">
                    <strong>Skin:</strong> 
                    <p class="skinName">${champion.skins[this.currentSkin].name}</p>
                </div>
            </div>
            <div>
                <strong>${roleLabel}:</strong> 
                ${champion.tags.map(tag => `<span class="tag">${tag}</span>`).join(' | ')}
            </div>
            <p>
                <strong>Type:</strong> 
                <span class="tag">${champion.partype}</span>
            </p>
            <p class="description"><strong>Description:</strong> ${champion.description}</p>
        `;
        
        popup.style.display = "flex";

        document.getElementById("prevSkin").addEventListener("click", () => {
            this.currentSkin = (this.currentSkin - 1 + skinImgs.length) % skinImgs.length;
            this.updateSkinImg(skinImgs, champion.skins);
        });

        document.getElementById("nextSkin").addEventListener("click", () => {
            this.currentSkin = (this.currentSkin + 1) % skinImgs.length;
            this.updateSkinImg(skinImgs, champion.skins);
        });
        
        document.querySelector(".close-popup").addEventListener("click", () => {
            document.getElementById("champion-popup").style.display = "none";
        });
    }

    updateSkinImg(skinImgs, skins) {
        const skinImage = document.querySelector('.splash');
        skinImage.src = skinImgs[this.currentSkin];
        const skinName = document.querySelector('.skinName');
        skinName.textContent = skins[this.currentSkin].name;
    }

    changePage(direction) {
        this.currentPage += direction;

        const totalPages = Math.ceil(this.model.getAllChampions().length / this.itemsPerPage);
        if (this.currentPage < 0) this.currentPage = 0;
        if (this.currentPage >= totalPages) this.currentPage = totalPages - 1;

        this.displayChampions(this.model.getAllChampions());
        this.updatePaginationButtons();
    }

    updatePaginationButtons() {
        const totalPages = Math.ceil(this.model.getAllChampions().length / this.itemsPerPage);
        document.getElementById('prevPage').disabled = this.currentPage === 0;
        document.getElementById('nextPage').disabled = this.currentPage >= totalPages - 1;
    }
}
