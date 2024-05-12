import {HttpUtils} from "../../utils/http-utils";

export class IncomeShow {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.categoriesIncome = null;
        this.incomeCategoryTitle = document.getElementById('incomeCategoryTitle');
        this.incomeCategoryEdit = document.getElementById('incomeCategoryEdit');
        this.incomeCategoryDelete = document.getElementById('incomeCategoryDelete');
        this.cards = document.getElementById('cards');
        this.init();
    }
    async init() {
            try {
                const result = await HttpUtils.request( '/categories/income');
                console.log(result);
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    this.categoriesIncome = result;
                    this.showCategoryIncome();
                }
            } catch (error) {
                console.log(error)
            }

    }

    showCategoryIncome() {

        this.cards.innerHTML = '';
        const addIncomeElement = document.createElement('div');
        addIncomeElement.classList.add('col-4', 'border', 'rounded-4', 'card', 'gy-4', 'me-4');

        const addLinkIncomeElement = document.createElement('a');
        addLinkIncomeElement.setAttribute("href", "/income/create");
        addLinkIncomeElement.classList.add('income-card-add',  'align-middle', 'text-center', 'text-secondary', 'm-0');

        const addSvgIncomeElement = document.createElement('svg');
        addSvgIncomeElement.setAttribute("href", "/income/create");
        addSvgIncomeElement.classList.add('plus');
        addSvgIncomeElement.setAttribute("width", "15");
        addSvgIncomeElement.setAttribute("height", "15");
        addSvgIncomeElement.setAttribute("viewBox", "0 0 15 15");
        addSvgIncomeElement.setAttribute("fill", "none");
        addSvgIncomeElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        const addPathIncomeElement = document.createElement('path');
        addPathIncomeElement.setAttribute("d", "M14.5469 6.08984V9.05664H0.902344V6.08984H14.5469ZM9.32422 0.511719V15.0039H6.13867V0.511719H9.32422Z");
        addPathIncomeElement.setAttribute("fill", "#CED4DA");

        addSvgIncomeElement.appendChild(addPathIncomeElement);
        addLinkIncomeElement.appendChild(addSvgIncomeElement);
        addIncomeElement.appendChild(addLinkIncomeElement)

        this.categoriesIncome.response.forEach(category => {

            const titleElement = document.createElement('h3');
            titleElement.className = 'income-name';
            titleElement.className = 'text-primary-emphasis';
            titleElement.setAttribute("id", "incomeCategoryTitle");
            titleElement.innerText = category.title;
            console.log(category.title)


            const linkElement = document.createElement('a');
            linkElement.setAttribute("href", "/income/update?id=" + category.id);
            linkElement.setAttribute("type", "button");
            linkElement.classList.add('btn', 'btn-primary', 'me-1') ;
            linkElement.setAttribute("id", "incomeCategoryEdit");
            linkElement.innerText = 'Редактировать';


            const buttonElement = document.createElement('button');
            buttonElement.setAttribute("href", "/income/delete?id=" + category.id);
            buttonElement.setAttribute("type", "button");
            buttonElement.classList.add('btn', 'btn-danger', 'me-1');
            buttonElement.setAttribute("id", "incomeCategoryDelete");
            // buttonElement.setAttribute("data-bs-toggle", "modal");
            buttonElement.setAttribute("data-bs-target", "#deleteIncome");
            buttonElement.innerText = 'Удалить';

            const incomeCard = document.createElement('div');
            incomeCard.classList.add('income-card','p-3');

            const card = document.createElement('div');
            card.classList.add('col-4', 'border', 'rounded-4', 'card', 'me-4', 'gy-4');

            incomeCard.appendChild(titleElement);
            incomeCard.appendChild(linkElement);
            incomeCard.appendChild(buttonElement);
            card.appendChild(incomeCard)
            this.cards.appendChild(card)

        });
        this.cards.appendChild(addIncomeElement);

    }
}