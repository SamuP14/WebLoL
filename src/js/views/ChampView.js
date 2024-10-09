export class ChampView {
    constructor(model) {
        this.model = model;
        this.champions = [];
        this.loldex = document.getElementById("loldex");
        this.loadingMessage = document.querySelector(".loading");
        this.pagination = document.querySelector(".pagination");
        this.currentPage = 0;
        this.itemsPerPage = 8;
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
        
        championInfo.innerHTML = `
            <h2>${champion.name}, ${champion.title}</h2>
            <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg" class="splash">
            <p>
                <strong>${roleLabel}:</strong> 
                ${champion.tags.map(tag => `<span class="tag">${tag}</span>`).join(' | ')}
            </p>
            <p>
                <strong>Type:</strong> 
                <span class="tag">${champion.partype}</span>
            </p>
            <p class="description"><strong>Description:</strong> ${champion.description}</p>
        `;
        
        popup.style.display = "flex";
        
        document.querySelector(".close-popup").addEventListener("click", () => {
            document.getElementById("champion-popup").style.display = "none";
        });
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
