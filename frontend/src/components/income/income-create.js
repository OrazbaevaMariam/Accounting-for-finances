import {IncomeService} from "../../services/income-service";

export class IncomeCreate {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('saveButton').addEventListener('click', this.saveCategory.bind(this));
        document.getElementById('cancelButton').addEventListener('click', this.cancelCategory.bind(this));

        this.findElements();

    }

    findElements() {
        this.expenseInputElement = document.getElementById('create-input');
    };

    async saveCategory(e) {
        e.preventDefault();

        const createData = {
            title: this.expenseInputElement.value,
        };

        const response = await IncomeService.createIncome(createData);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/income');
    };
    async cancelCategory(e) {
        e.preventDefault();

        return this.openNewRoute('/income');
    };


}