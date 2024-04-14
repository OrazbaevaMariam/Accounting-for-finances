import {Chart} from "chart.js/auto";
import 'bootstrap';

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.init();

    }
    async init(){
        await this.getPie();
    }

    getPie() {

        const data = {
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

        const config = {
            type: 'pie',
            data,
            options
        };

        const myChartIncome = new Chart(
            document.getElementById('myChartIncome'),
            config,
            // options.plugins.title.text = 'Доходы'
        );

        const myChartExpense = new Chart(
            document.getElementById('myChartExpense'),
            config,
            // options.plugins.title.text = 'Расходы'
        )


    }

}

