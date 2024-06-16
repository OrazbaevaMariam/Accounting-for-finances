import {Chart} from "chart.js/auto";
import 'bootstrap';
import {HttpUtils} from "../utils/http-utils";
import {OperationsService} from "../services/operations-service";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.categoriesIncome = null;

        const weekFilter = document.getElementById('weekFilter');
        const monthFilter = document.getElementById('monthFilter');
        const yearFilter = document.getElementById('yearFilter');
        const allDatesFilter = document.getElementById('allDatesFilter');
        const intervalFilter = document.getElementById('intervalFilter');
        this.dateStart = document.getElementById('date-start');
        this.dateEnd = document.getElementById('date-end');
        allDatesFilter.addEventListener('click', () => this.init());
        weekFilter.addEventListener('click', () => this.weekFilter());
        monthFilter.addEventListener('click', () => this.monthFilter());
        yearFilter.addEventListener('click', () => this.yearFilter());
        intervalFilter.addEventListener('click', () => this.intervalFilter());
        this.init();

    }
    async init(){
        try {
            const result = await HttpUtils.request('/categories/income');
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.categoriesIncome = result.response;
                console.log(Object.values(this.categoriesIncome));

            }
        } catch (error) {
            console.log(error)
        }
        await this.getPie();
    }

    getPie() {

        const dataIncome = {
            labels: Object.values(this.categoriesIncome),
            datasets: [{
                label: '# of Votes',
                data: this.categoriesIncome,
                borderWidth: 1
            }]
        };

        const dataExpense = {
            labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
            datasets: [{
                label: '# of Votes',
                data: [1,2,3,4,5],
                borderWidth: 1
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    // display: false,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: ''
                }
            }
        };

        const configIncome = {
            type: 'pie',
            data:dataIncome,
            options
        };
        const configExpense = {
            type: 'pie',
            data: dataExpense,
            options
        };


        const myChartIncome = new Chart(
            document.getElementById('myChartIncome'),
            configIncome,
        );
        // if(myChartIncome){
        //     myChartIncome.clear();
        //     myChartIncome.destroy();
        // };


        const myChartExpense = new Chart(
            document.getElementById('myChartExpense'),
            configExpense,
        )


    }
    async weekFilter() {
        try {
            const result = await OperationsService.getOperationsFilter('', this.dateStart, this.dateEnd, 'week');
            console.log(result);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.operations = result;
                this.getPie();
            }
        } catch (error) {
            console.log(error)
        }

    }
    async monthFilter() {
        try {
            const result = await OperationsService.getOperationsFilter('', this.dateStart, this.dateEnd, 'month');
            console.log(result);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.operations = result;
                this.getPie();
            }
        } catch (error) {
            console.log(error)
        }

    }
    async yearFilter() {
        try {
            const result = await OperationsService.getOperationsFilter('', this.dateStart, this.dateEnd, 'year');
            console.log(result);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.operations = result;
                this.getPie();
            }
        } catch (error) {
            console.log(error)
        }

    }

    async intervalFilter() {
        try {
            const result = await OperationsService.getOperationsFilter('interval', this.dateStart, this.dateEnd, null);
            console.log(result);
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }

                this.operations = result;
                this.getPie();
            }
        } catch (error) {
            console.log(error)
        }

    }

}

