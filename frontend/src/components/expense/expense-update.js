import {HttpUtils} from "../../utils/http-utils";
import {UrlUtils} from "../../utils/url-utils.js";
import {ExpenseService} from "../../services/expense-service";

export class ExpenseUpdate {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('updateButton').addEventListener('click', this.updateOrder.bind(this));
        document.getElementById('cancelButton').addEventListener('click', this.updateOrder.bind(this));

        this.findElements();

        this.init(id).then();
    }

    findElements() {
        this.expenseInputElement = document.getElementById('expenseInput');
    }

    async init(id) {
        const expenseData = await this.getExpense(id);
        if (expenseData) {
            if (expenseData.title) {
                await this.getExpense(expenseData.title, expenseData.title.id);
            }
        }
    }

    async getExpense(title, id) {
        const result = await HttpUtils.request('/categories/expense/' + id);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе заказа. Обратитесь в поддержку');
        }

        this.orderOriginalData = result.response;
        return result.response;
    }

    async updateOrder(e) {
        e.preventDefault();

            const changedData = {};

            if (this.expenseInputElement.value !== this.orderOriginalData.title) {
                changedData.description = this.expenseInputElement.value;
            }


                const response = await ExpenseService.updateExpense(this.orderOriginalData.title, changedData);

                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }

                return this.openNewRoute('/expense')


    }
}