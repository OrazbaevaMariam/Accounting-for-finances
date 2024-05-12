import {HttpUtils} from "../../utils/http-utils";
import {IncomeService} from "../../services/income-service";

export class OperationsIncomeCreate {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('createIncomeButton').addEventListener('click', this.saveIncome.bind(this));
        document.getElementById('cancelIncomeButton').addEventListener('click', this.cancelIncome.bind(this));
        this.categoryIncome = null;

        this.findElements();

        this.init().then();

        // this.validations = [
        //     {element: this.incomeCreateInputSelectElement = document.getElementById('input-income-type')},
        //     {element: this.incomeCreateISelectCategoryElement = document.getElementById('input-income-category')},
        //     {element: this.incomeCreateInputAmountElement = document.getElementById('input-income-sum')},
        //     {element: this.incomeCreateInputDateElement = document.getElementById('input-income-date')},
        //     {element: this.incomeCreateInputCommentElement = document.getElementById('input-income-message')},
        // ]

        // this.getFreelancers().then();
    }

    findElements() {
        this.incomeCreateInputSelectElement = document.getElementById('input-income-type');
        this.incomeCreateISelectCategoryElement = document.getElementById('input-income-category');
        this.incomeCreateISelectIncomeCategoryElement = document.getElementById('selectIncomeCategory');
        this.incomeCreateISelectOptionElement = document.getElementById('input-income-option');
        this.incomeCreateInputAmountElement = document.getElementById('input-income-sum');
        this.incomeCreateInputDateElement = document.getElementById('input-income-date');
        this.incomeCreateInputCommentElement = document.getElementById('input-income-message');
    };
    async init() {
        this.incomeCreateISelectCategoryElement = await this.getIncomes();
    }
    async getIncomes() {
        const result = await HttpUtils.request('/categories/income');
        // console.log(result.response)

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе категории. Обратитесь в поддержку');
        }

        this.categoryIncome = result.response;
        for (let value of Object.values(this.categoryIncome)) {
            this.incomeCreateISelectOptionElement = document.createElement('option');
            this.incomeCreateISelectOptionElement.value = value.id;
            this.incomeCreateISelectOptionElement.innerText = value.title;
            this.incomeCreateISelectIncomeCategoryElement.appendChild(this.incomeCreateISelectOptionElement);
        }

        return result.response;
    }


    async saveIncome(e) {
        e.preventDefault();

        const createData = {
            type: this.incomeCreateInputSelectElement.value,
            amount: this.incomeCreateInputAmountElement.value,
            date: this.incomeCreateInputDateElement.toISOString(),
            comment: this.incomeCreateInputCommentElement.value,
            category_id: this.incomeCreateISelectOptionElement.value
        };

        const response = await IncomeService.createIncome(createData);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/income');

        // this.incomeCreateISelectCategoryElement.value = ;

        if (ValidationUtils.validateForm(this.validations)) {
            const createData = {
                type: this.incomeCreateInputSelectElement.value,
                category: this.incomeCreateISelectCategoryElement.value,
                sum: this.incomeCreateInputAmountElement.value,
                date: this.incomeCreateInputDateElement.toISOString(),
            };

            if (this.incomeCreateInputCommentElement) {
                createData.message = this.incomeCreateInputCommentElement.value;
            }
            const response = await IncomeService.createIncome(createData);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/operations');
        }
    }
    async cancelIncome(e) {
        e.preventDefault();

        return this.openNewRoute('/operations');
    };


}