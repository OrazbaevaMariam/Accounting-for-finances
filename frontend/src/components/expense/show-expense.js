import {UrlUtils} from "../../utils/url-utils";
import {ExpenseService} from "../../services/expense-service";

export class ShowExpense {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('edit-link').href = '/expense/delete?id=' + id;
        document.getElementById('delete-link').href = '/income/delete?id=' + id;

        this.getExpense(id).then();
    }

    async getExpense(id) {
        const response = await ExpenseService.getExpense(id);

        if (response.error){
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showExpense(response.title);
    }

    showExpense(category) {
        if (category.title) {
            document.getElementById('expense-title').innerText = category.title;
        }
        document.getElementById('expense-add').innerHTML = `<a href=/expense/create?id=` + category.id + `>` + `</a>`;

    }

}