import {ValidationUtils} from "../../utils/validation-utils";
import {IncomeService} from "../../services/income-service";

export class OperationsExpenseCreate {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // document.getElementById('createExpenseButton').addEventListener('click', this.saveOrder.bind(this));
        //
        // this.validations = [
        //     { element :this.incomeCreateInputSelectElement = document.getElementById('input-income-type')},
        //     { element :this.incomeCreateISelectCategoryElement = document.getElementById('input-income-category')},
        //     { element :this.incomeCreateInputAmountElement = document.getElementById('input-income-sum')},
        //     { element :this.incomeCreateInputDateElement = document.getElementById('input-income-date')},
        //     { element :this.incomeCreateInputCommentElement = document.getElementById('input-income-message')},
        // ]

        // this.getFreelancers().then();
    }

    // async saveOrder(e) {
    //     e.preventDefault();
    //
    //     if (ValidationUtils.validateForm(this.validations)) {
    //         const createData = {
    //             type: this.incomeCreateInputSelectElement.value,
    //             category: this.incomeCreateISelectCategoryElement.value,
    //             sum: this.incomeCreateInputAmountElement.value,
    //             date: this.incomeCreateInputDateElement.toISOString(),
    //     };
    //
    //         if (this.incomeCreateInputCommentElement) {
    //             createData.message = this.incomeCreateInputCommentElement.value;
    //         }
    //         const response = await IncomeService.createIncome(createData);
    //
    //         if (response.error){
    //             alert(response.error);
    //             return response.redirect ? this.openNewRoute(response.redirect) : null;
    //         }
    //
    //         return this.openNewRoute('/operations');
    //     }
    // }


}