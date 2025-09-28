document.addEventListener('DOMContentLoaded', () => {
    const provincialData = [
        { province: "PAPUA TENGAH", value: 37.69 }, { province: "MALUKU", value: 31.66 },
        { province: "PAPUA SELATAN", value: 29.26 }, { province: "MALUKU UTARA", value: 28.44 },
        { province: "PAPUA PEGUNUNGAN", value: 27.26 }, { province: "PAPUA", value: 26.03 },
        { province: "PAPUA BARAT", value: 21.91 }, { province: "PAPUA BARAT DAYA", value: 20.53 },
        { province: "GORONTALO", value: 15.99 }, { province: "KALIMANTAN UTARA", value: 14.61 },
        { province: "KALIMANTAN BARAT", value: 13.56 }, { province: "NUSA TENGGARA TIMUR", value: 12.49 },
        { province: "RIAU", value: 10.93 }, { province: "LAMPUNG", value: 10.68 },
        { province: "KEP. BANGKA BELITUNG", value: 10.66 }, { province: "JAMBI", value: 10.58 },
        { province: "SULAWESI TENGAH", value: 10.51 }, { province: "SULAWESI TENGGARA", value: 10.25 },
        { province: "BENGKULU", value: 9.86 }, { province: "KEP. RIAU", value: 9.55 },
        { province: "ACEH", value: 9.10 }, { province: "DI YOGYAKARTA", value: 9.05 },
        { province: "SUMATERA BARAT", value: 8.88 }, { province: "JAWA TENGAH", value: 8.63 },
        { province: "KALIMANTAN TENGAH", value: 8.50 }, { province: "JAWA TIMUR", value: 8.40 },
        { province: "SUMATERA UTARA", value: 7.54 }, { province: "KALIMANTAN TIMUR", value: 7.40 },
        { province: "SULAWESI SELATAN", value: 6.99 }, { province: "SULAWESI BARAT", value: 6.53 },
        { province: "SULAWESI UTARA", value: 6.16 }, { province: "JAWA BARAT", value: 5.99 },
        { province: "SUMATERA SELATAN", value: 5.97 }, { province: "KALIMANTAN SELATAN", value: 3.83 },
        { province: "DKI JAKARTA", value: 3.53 }, { province: "BALI", value: 3.20 },
        { province: "NUSA TENGGARA BARAT", value: 2.74 }, { province: "BANTEN", value: 2.55 }
    ];

    const foodProductionData = {
        sagu: {
            labels: ['2018', '2019', '2020', '2021'],
            data: [463542, 359838, 365665, 381065],
            name: "Produksi Sagu (Ton)"
        },
        singkong: {
            labels: ['2018', '2019', '2020', '2021'],
            data: [16050560, 16350000, 18300300, 19150000],
            name: "Produksi Singkong (Ton)"
        },
        jagung: {
            labels: ['2018', '2019', '2020', '2021'],
            data: [19856000, 20500000, 21530000, 22440456],
            name: "Produksi Jagung (Ton)"
        }
    };

    let provincialChart;

    function createProvincialChart(data) {
    const ctx = document.getElementById('provincialHungerChart').getContext('2d');
    if (provincialChart) provincialChart.destroy();

    provincialChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.province),
            datasets: [{
                label: 'Prevalensi Ketidakcukupan Konsumsi Pangan (%)',
                data: data.map(d => d.value),
                backgroundColor: data.map(d =>
                    d.value > 15 ? '#b91c1c' : (d.value > 10 ? '#f59e0b' : '#16a34a')
                ),
                borderColor: data.map(d =>
                    d.value > 15 ? '#991b1b' : (d.value > 10 ? '#d97706' : '#15803d')
                ),
                borderWidth: 1,
                barPercentage: 0.8,  // Mengatur lebar bar agar tidak terlalu tebal
                categoryPercentage: 0.9
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 15,
                    right: 25,
                    top: 7,
                    bottom: 7
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: context => ` ${context.dataset.label}: ${context.raw}%`
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: 'Persentase (%)' },
                    ticks: {
                        font: {
                            size: 14
                        },
                        stepSize: 5,
                        maxTicksLimit: 10
                    }
                },
                y: {
                    ticks: {
                        autoSkip: false,
                        font: { size: 14, weight: 'bold' },  // Perbesar dan tebalkan font label
                        maxRotation: 0,
                        minRotation: 0,
                        padding: 5,
                        callback: function(value) {
                            const label = this.getLabelForValue(value);
                            if (label.length > 20) {
                                return label.substring(0, 17) + '...';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}


    function updateChartData(sortedData) {
        provincialChart.data.labels = sortedData.map(d => d.province);
        provincialChart.data.datasets[0].data = sortedData.map(d => d.value);
        provincialChart.data.datasets[0].backgroundColor = sortedData.map(d =>
            d.value > 15 ? '#b91c1c' : (d.value > 10 ? '#f59e0b' : '#16a34a')
        );
        provincialChart.data.datasets[0].borderColor = sortedData.map(d =>
            d.value > 15 ? '#991b1b' : (d.value > 10 ? '#d97706' : '#15803d')
        );
        provincialChart.update();
    }

    // Sorting buttons
    document.getElementById('sort-desc').addEventListener('click', () => {
        updateChartData([...provincialData].sort((a, b) => b.value - a.value));
    });
    document.getElementById('sort-asc').addEventListener('click', () => {
        updateChartData([...provincialData].sort((a, b) => a.value - b.value));
    });
    document.getElementById('sort-alpha').addEventListener('click', () => {
        updateChartData([...provincialData].sort((a, b) => a.province.localeCompare(b.province)));
    });

    createProvincialChart([...provincialData].sort((a, b) => b.value - a.value));

    // Food production charts
    const foodCharts = {};
    function createFoodProductionChart(type) {
        if (foodCharts[type]) return;

        const ctx = document.getElementById(`${type}Chart`).getContext('2d');
        const chartData = foodProductionData[type];

        foodCharts[type] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: chartData.name,
                    data: chartData.data,
                    fill: true,
                    borderColor: '#D97706',
                    backgroundColor: '#FEF3C7',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'bottom' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: value => {
                                if (value >= 1000000) return (value / 1000000) + ' Juta';
                                if (value >= 1000) return (value / 1000) + ' Ribu';
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }

    // Tabs
    const tabs = document.querySelectorAll('.tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => {
                item.classList.remove('active');
                item.classList.add('text-gray-500', 'border-transparent');
            });

            tab.classList.add('active');
            tab.classList.remove('text-gray-500', 'border-transparent');

            const target = tab.getAttribute('data-target');
            tabPanels.forEach(panel => {
                panel.id === target
                    ? panel.classList.remove('hidden')
                    : panel.classList.add('hidden');
            });
        });
    });

    // Initialize food production charts
    createFoodProductionChart('sagu');
    createFoodProductionChart('singkong');
    createFoodProductionChart('jagung');

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});
