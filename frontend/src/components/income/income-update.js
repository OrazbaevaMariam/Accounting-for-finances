import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils.js";
import {UrlUtils} from "../../utils/url-utils.js";
import {IncomeService} from "../../services/income-service";

export class IncomeUpdate {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('saveButton').addEventListener('click', this.updateOrder.bind(this));
        // bsCustomFileInput.init();


        this.findElements();

        this.validations = [
            {element: this.incomeCreateSelectTypeElement},
            {element: this.incomeCreateISelectCategoryElement},
            {element: this.incomeCreateInputAmountElement},
            {element: this.incomeCreateInputDateElement},
            {element: this.incomeCreateInputCommentElement},
        ]
        this.init(id).then();
    }

    findElements() {
        this.incomeCreateSelectTypeElement = document.getElementById('input-income-type');
        this.incomeCreateISelectCategoryElement = document.getElementById('input-income-category');
        this.incomeCreateInputAmountElement = document.getElementById('input-income-sum');
        this.incomeCreateInputDateElement = document.getElementById('input-income-date');
        this.incomeCreateInputCommentElement = document.getElementById('input-income-message');
    }

    async init(id) {
        const orderData = await this.getOrder(id);
        if (orderData) {
            this.showOrder(orderData);
            if (orderData.freelancer) {
                await this.getFreelancers(orderData.freelancer.id);
            }
        }
    }

    async getOrder(id) {
        const result = await HttpUtils.request('/operations/edit/income/' + id);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе операции. Обратитесь в поддержку');
        }

        this.orderOriginalData = result.response;
        return result.response;
    }

    // async getSelectElements(currentIncomeId) {
    //     const response = await IncomeService.getIncomes(id);
    //
    //     if (response.error) {
    //         alert(response.error);
    //         return response.redirect ? this.openNewRoute(response.redirect) : null;
    //     }
    //
    //     for (let i = 0; i < response.freelancers.length; i++) {
    //         const option = document.createElement('option');
    //         option.value = response.freelancers[i].id;
    //         option.innerText = response.freelancers[i].name + ' ' + response.freelancers[i].lastName;
    //         if (currentFreelancerId === response.freelancers[i].id) {
    //             option.selected = true;
    //         }
    //         this.freelancerSelectElement.appendChild(option);
    //     }
    //
    //     // this.freelancerOriginalData = result.response;
    //     //
    //     // this.showFreelancer(result.response);
    // }

    showOrder(order) {

        this.incomeCreateInputAmountElement.value = order.amount;
        this.incomeCreateInputDateElement.value = order.date;
        this.incomeCreateInputCommentElement.value = order.comment;
        for (let i = 0; i < this.incomeCreateSelectTypeElement.options.length; i++) {
            if (this.incomeCreateSelectTypeElement.options[i].value === order.type) {
                this.incomeCreateSelectTypeElement.selectedIndex = i;
            }
        }
        for (let i = 0; i < this.incomeCreateISelectCategoryElement.options.length; i++) {
            if (this.incomeCreateISelectCategoryElement.options[i].value === order.category) {
                this.incomeCreateISelectCategoryElement.selectedIndex = i;
            }
        }

    }

    async updateOrder(e) {
        e.preventDefault();

        if (ValidationUtils.validateForm(this.validations)) {
            const changedData = {};
            if (parseInt(this.incomeCreateInputAmountElement.value) !== parseInt(this.orderOriginalData.amount)) {
                changedData.amount = parseInt(this.incomeCreateInputAmountElement.value);
            }
            if (this.incomeCreateInputDateElement.value.toISOString() !== this.orderOriginalData.date) {
                changedData.date = this.incomeCreateInputDateElement.value.toISOString();
            }
            if (this.incomeCreateInputCommentElement.value !== this.orderOriginalData.comment) {
                changedData.comment = this.incomeCreateInputCommentElement.value;
            }
            if (this.incomeCreateSelectTypeElement.value !== this.orderOriginalData.type) {
                changedData.type = this.incomeCreateSelectTypeElement.value;
            }
            if (this.incomeCreateISelectCategoryElement.value !== this.orderOriginalData.type) {
                changedData.type = this.incomeCreateISelectCategoryElement.value;
            }

            if (Object.keys(changedData).length > 0) {
                const response = await IncomeService.updateIncome(this.orderOriginalData.id, changedData);

                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }

                return this.openNewRoute('/operations')
            }
        }
    }
}