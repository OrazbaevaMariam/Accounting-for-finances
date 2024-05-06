import {UrlUtils} from "../../utils/url-utils.js";
import {ExpenseService} from "../../services/expense-service";

export class ExpenseDelete {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteExpense(id).then();
    }

    async deleteExpense(id){
        const response = await ExpenseService.deleteExpense(id);

        if (response.error){
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/expense');

    }
}