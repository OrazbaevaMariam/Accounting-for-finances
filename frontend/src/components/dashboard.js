 export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getPie().then();
    }

    getPie() {
        const data = {
            labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
            datasets: [{
                label: '# of Votes',
                data: [],
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
            options.plugins.title.text = 'Доходы'
        );

        const myChartExpense = new Chart(
            document.getElementById('myChartExpense'),
            config,
            options.plugins.title.text = 'Расходы'
        )


    }

}

