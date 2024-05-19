import {HttpUtils} from "../../utils/http-utils";

export class OperationsList {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.operations = null;
        this.tableBody = document.getElementById('table-body');
        this.init();

    }

    async init() {
        try {
            const result = await HttpUtils.request('/operations');
            console.log(result);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.operations = result;
                this.showOperations();
            }
        } catch (error) {
            console.log(error)
        }

    }

    showOperations() {
        this.tableBody.innerHTML = '';
        // console.log(this.operations.response)

        // console.log(this.tableBody)

        this.operations.response.forEach(function (operation, index) {
            // console.log(operation)
            const table = document.createElement('tr');

            const number = document.createElement('th');
            number.setAttribute('scope', 'row');
            number.innerText = index + 1;

            const operationType = document.createElement('td');
            operationType.classList.add('text-success', 'text-center');
            operationType.innerText = operation.type;

            const operationCategory = document.createElement('td');
            operationType.innerText = operation.category;

            const operationAmount = document.createElement('td');
            operationType.innerText = operation.amount + '$';

            const operationDate = document.createElement('td');
            operationType.innerText = operation.date;

            const operationComment = document.createElement('td');
            operationType.innerText = operation.comment;

            const operationDeleteOperation = document.createElement('td');
            const operationDeleteOperationLink = document.createElement('a');
            operationDeleteOperationLink.setAttribute('href', '/operations/delete?id=' + operation.id);
            operationDeleteOperationLink.setAttribute('type', 'button');
            operationDeleteOperationLink.setAttribute('data-bs-toggle', 'modal');
            operationDeleteOperationLink.setAttribute('data-bs-target', '#deleteOperation');
            const operationDeleteOperationIcon = document.createElement('i');
            operationDeleteOperationIcon.classList.add('bi', 'bi-trash');
            operationDeleteOperationLink.appendChild(operationDeleteOperationIcon);
            operationDeleteOperation.appendChild(operationDeleteOperationLink);

            const operationEditOperation = document.createElement('td');
            const operationEditOperationLink = document.createElement('a');
            operationEditOperationLink.setAttribute('href', '/operations/edit?id=' + operation.id);
            const operationEditOperationLinkIcon = document.createElement('i');
            operationEditOperationLinkIcon.classList.add('bi', 'bi-pencil');
            operationEditOperationLink.appendChild(operationEditOperationLinkIcon);
            operationEditOperation.appendChild(operationEditOperationLink);

            table.appendChild(number);
            table.appendChild(operationType);
            table.appendChild(operationCategory);
            table.appendChild(operationAmount);
            table.appendChild(operationDate);
            table.appendChild(operationComment);
            table.appendChild(operationDeleteOperation);
            table.appendChild(operationEditOperation);

            this.tableBody.appendChild(table);

            // const titleElement = document.createElement('h3');
            // titleElement.className = 'income-name';
            // titleElement.className = 'text-primary-emphasis';
            // titleElement.setAttribute("id", "incomeCategoryTitle");
            // titleElement.innerText = category.title;
            // // console.log(category.title)


            // const linkElement = document.createElement('a');
            // linkElement.setAttribute("href", "/income/update?id=" + operation.id);
            // linkElement.setAttribute("type", "button");
            // linkElement.classList.add('btn', 'btn-primary', 'me-1');
            // linkElement.setAttribute("id", "incomeCategoryEdit");
            // linkElement.innerText = 'Редактировать';


            // const buttonElement = document.createElement('button');
            // buttonElement.setAttribute("href", "/income/delete?id=" + operation.id);
            // buttonElement.setAttribute("type", "button");
            // buttonElement.classList.add('btn', 'btn-danger', 'me-1');
            // buttonElement.setAttribute("id", "incomeCategoryDelete");
            // buttonElement.setAttribute("data-bs-toggle", "modal");
            // buttonElement.setAttribute("data-bs-target", "#deleteIncome");
            // buttonElement.innerText = 'Удалить';

            // const incomeCard = document.createElement('div');
            // incomeCard.classList.add('income-card', 'p-3');
            //
            // const card = document.createElement('div');
            // card.classList.add('col-4', 'border', 'rounded-4', 'card', 'me-4', 'gy-4');
            //
            // incomeCard.appendChild(titleElement);
            // incomeCard.appendChild(linkElement);
            // incomeCard.appendChild(buttonElement);
            // card.appendChild(incomeCard);
            // this.cards.prepend(card)


        });
        console.log(this.tableBody);

    }

}