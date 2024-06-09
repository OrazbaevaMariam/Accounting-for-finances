import {HttpUtils} from "../../utils/http-utils";
import {UrlUtils} from "../../utils/url-utils";
import {IncomeService} from "../../services/income-service";
import {OperationsService} from "../../services/operations-service";
import {ExpenseService} from "../../services/expense-service";

export class OperationsUpdate {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }
        this.operationData = null;
        this.categoryExpense = null;


        document.getElementById('updateOperationButton').addEventListener('click', this.updateOperation.bind(this));
        document.getElementById('cancelOperationButton').addEventListener('click', this.updateOperation.bind(this));
        this.findElements();

        this.init(id).then();
    }

    findElements() {
        this.OperationType = document.getElementById('operation-type');
        this.OperationCategory = document.getElementById('operation-category');
        this.OperationSum = document.getElementById('operation-sum');
        this.OperationDate = document.getElementById('operation-date');
        this.OperationMessage = document.getElementById('operation-message');
    }

    async init(id) {
        this.operationData = await this.getOperation(id);

    }

    async getOperation(id) {
        const result = await HttpUtils.request('/operations/' + id);
        console.log(result);
        if (result.response.type === "income"){
            this.OperationType.value = '1';
        } else {
            this.OperationType.value = '2';
        }
        // this.OperationCategory.setAttribute('value', result.response.category);
        // this.OperationCategory.value = result.response.category;
        this.OperationCategorySelectOptionElement = document.createElement('option');
        this.OperationCategorySelectOptionElement.innerText = result.response.category;
        this.OperationCategorySelectOptionElement.value = result.response.id;
        this.OperationCategorySelectOptionElement.setAttribute('value', result.response.category)

        // this.OperationCategory.innerText = result.response.category;
        this.OperationCategory.appendChild(this.OperationCategorySelectOptionElement);
        this.OperationCategory.value = result.response.category;

        this.OperationSum.setAttribute('value', result.response.amount)
        this.OperationDate.setAttribute('value', result.response.date)
        this.OperationMessage.setAttribute('value', result.response.comment)


        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе категории. Обратитесь в поддержку');
        }

        this.operationData = result.response;
        for (let key in this.operationData) {
            console.log(key)
            // var obj = data.messages[key];
            // ...
        }

        return result.response;
    }

    showExpenseCategories(){

    }


    async updateOperation(e) {
        e.preventDefault();

        const changedData = {};

        if (this.OperationType.value !== this.operationData.type) {
            changedData.category = this.OperationType.value;
        }

        if (this.OperationCategorySelectOptionElement.value !== this.operationData.category) {
            changedData.category = this.OperationCategorySelectOptionElement.value;
        }

        if (this.OperationSum.value !== this.operationData.amount) {
            changedData.amount = this.OperationSum.value;
        }

        if (this.OperationDate.value !== this.operationData.date) {
            changedData.date = this.OperationDate.value;
        }

        if (this.OperationMessage.value !== this.operationData.comment) {
            changedData.comment = this.OperationMessage.value;
        }

        console.log(this.operationData)

        const response = await OperationsService.updateOperation(this.operationData.id, changedData);

        if (response.error) {
            console.log('error', response.error)
            // alert(response.error);
            // return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/operations')


    }
}