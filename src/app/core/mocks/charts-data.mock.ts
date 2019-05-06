export const chartsData = {
    chartColors: [
        {
            backgroundColor: [
                'rgb(0,255,255,.5)',
                'rgb(255,255,0,.5)',
                'rgb(255,0,255,.5)',
                'rgb(255,0,0,.5)',
                'rgb(0,0,255,.5)',
                'rgb(199,21,133,.5)',
                'rgb(0,0,128,.5)',
            ]
        }
    ],
    radarChartLabels: ['Samsung', 'Sony', 'Apple', 'One Plus', 'Mi', 'Honor'],
    radarChartData: [
        { data: [65, 59, 80, 81, 56, 55], label: 'Current Month' },
        { data: [28, 48, 40, 19, 86, 27], label: 'Previous Month' }
    ],
    polarAreaChartLabels: ['Samsung', 'Sony', 'Apple', 'One Plus', 'Mi'],
    polarAreaChartData: [300, 450, 150, 240, 180],
    lineChartData: [
        { data: [65, 59, 80, 81, 56, 55, 40], label: '' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ],
    lineChartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    lineChartColors: [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ]

};
