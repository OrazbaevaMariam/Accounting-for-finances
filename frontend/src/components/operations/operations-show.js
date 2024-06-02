import {HttpUtils} from "../../utils/http-utils";
import {IncomeService} from "../../services/income-service";
import {OperationsService} from "../../services/operations-service";

export class OperationsList {
    currentIdDelete = null;
    // currentIdEdit = null;


    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.operations = null;
        this.tableBody = document.getElementById('table-body');

        document.getElementById(this.currentIdDelete).addEventListener('click', this.deleteOperation.bind(this));
        // document.getElementById(this.currentIdEdit).addEventListener('click', this.editOperation.bind(this));

        this.init();
        this.deleteOperation().then();


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

        this.operations.response.forEach( (operation, index) => {
            console.log(operation)
            const table = document.createElement('tr');

            const number = document.createElement('th');
            number.setAttribute('scope', 'row');
            number.innerText = index + 1;

            const operationType = document.createElement('td');
            operationType.classList.add('text-success', 'text-center');
            // console.log(operation.type)
            if (operation.type === "income"){
                // operationType.innerText = operation.type;
                operationType.innerText = "Доход";
                operationType.className = "text-success";
            } else {
                operationType.innerText = "Расход";
                operationType.className = "text-danger";
            }


            const operationCategory = document.createElement('td');
            operationCategory.innerText = operation.category;

            const operationAmount = document.createElement('td');
            operationAmount.innerText = operation.amount + '$';

            const operationDate = document.createElement('td');
            operationDate.innerText = operation.date;

            const operationComment = document.createElement('td');
            operationComment.innerText = operation.comment;

            const operationDeleteOperation = document.createElement('td');
            const operationDeleteOperationLink = document.createElement('a');
            operationDeleteOperationLink.setAttribute('href', '/operations/delete?id=' + operation.id);
            operationDeleteOperationLink.setAttribute('type', 'button');
            operationDeleteOperationLink.setAttribute('data-bs-toggle', 'modal');
            operationDeleteOperationLink.setAttribute('data-bs-target', '#deleteOperation');
            const operationDeleteOperationIcon = document.createElement('i');
            operationDeleteOperationIcon.classList.add('bi', 'bi-trash', 'deleteOperation');
            operationDeleteOperationLink.appendChild(operationDeleteOperationIcon);
            operationDeleteOperation.appendChild(operationDeleteOperationLink);
            operationDeleteOperation.onclick = () => {
                this.currentIdDelete = operation.id;
                operationDeleteOperationLink.setAttribute('id', this.currentIdDelete);
                console.log(this.currentIdDelete)
            }



            const operationEditOperation = document.createElement('td');
            const operationEditOperationLink = document.createElement('a');
            operationEditOperationLink.setAttribute('href', '/operations/edit?id=' + operation.id);
            const operationEditOperationLinkIcon = document.createElement('i');
            operationEditOperationLinkIcon.classList.add('bi', 'bi-pencil');
            operationEditOperationLink.appendChild(operationEditOperationLinkIcon);
            operationEditOperation.appendChild(operationEditOperationLink);
            operationEditOperation.onclick = () => {
                this.currentIdEdit = operation.id;
                operationEditOperation.setAttribute('id', this.currentIdEdit);
                console.log(this.currentIdEdit)
            }

            table.appendChild(number);
            table.appendChild(operationType);
            table.appendChild(operationCategory);
            table.appendChild(operationAmount);
            table.appendChild(operationDate);
            table.appendChild(operationComment);
            table.appendChild(operationDeleteOperation);
            table.appendChild(operationEditOperation);

            this.tableBody.appendChild(table);


        });

    }
    async deleteOperation() {

        const response = await OperationsService.deleteOperation(this.currentIdDelete);

        console.log(response)

        if (response.error){
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/operations');
    }

}