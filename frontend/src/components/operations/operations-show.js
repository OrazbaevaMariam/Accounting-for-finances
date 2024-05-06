import {ExpenseService} from "../../services/expense-service";
import {IncomeService} from "../../services/income-service";

export class OperationsList {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getOrders().then();
    }

    async getOrders() {
        const responseExpenses = await ExpenseService.getExpenses();
        const responseIncomes = await IncomeService.getIncomes();

        if (responseExpenses.error || responseIncomes){
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showRecords(response.orders);
    }

    showRecords(orders) {
        const recordsElement = document.getElementById('records');
        for (let i = 0; i < orders.length; i++) {
            const statusInfo = CommonUtils.getStatusInfo(orders[i].status);

            const trElement = document.createElement('tr');
            trElement.insertCell().innerText = orders[i].number;
            trElement.insertCell().innerText = orders[i].owner.name + ' ' + orders[i].owner.lastName;
            trElement.insertCell().innerHTML = '<a href="/freelancers/view?id=' + orders[i].freelancer.id + '">' + orders[i].freelancer.name + ' ' + orders[i].freelancer.lastName + '</a>';
            trElement.insertCell().innerText = (new Date(orders[i].scheduledDate)).toLocaleString('ru-RU');
            trElement.insertCell().innerText = (new Date(orders[i].deadlineDate)).toLocaleString('ru-RU');
            trElement.insertCell().innerHTML = '<span class="badge badge-' + statusInfo.color + '">' + statusInfo.name +'</span>';
            trElement.insertCell().innerText = orders[i].completeDate ? (new Date(orders[i].completeDate)).toLocaleString('ru-RU') : '';
            trElement.insertCell().innerHTML = CommonUtils.generateGridToolsColumn('orders', orders[i].id);

            recordsElement.appendChild(trElement);
        }
    }
}