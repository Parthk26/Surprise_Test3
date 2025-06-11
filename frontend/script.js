let rawData = [];

fetch('http://127.0.0.1:5000/get-data')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#data-table tbody');
    rawData = data.records;

    rawData.forEach(record => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.month || 'N/A'}</td>
        <td>${record.year || 'N/A'}</td>
        <td>${record.products || 'N/A'}</td>
        <td>${record.quantity_000_metric_tonnes_ || 'N/A'}</td>
      `;
      tableBody.appendChild(row);
    });
  });

document.getElementById('toggle-chart').addEventListener('click', () => {
  const chartContainer = document.getElementById('chart-container');
  const tableContainer = document.getElementById('table-container');
  const button = document.getElementById('toggle-chart');

  if (chartContainer.style.display === 'none') {
    drawChart();
    chartContainer.style.display = 'block';
    tableContainer.style.display = 'none';
    button.textContent = 'Show Table';
  } else {
    chartContainer.style.display = 'none';
    tableContainer.style.display = 'block';
    button.textContent = 'Show Bar Graph';
  }
});

function drawChart() {
  const productData = {};
  rawData.forEach(record => {
    const product = record.products || 'Unknown';
    const quantity = parseFloat(record.quantity_000_metric_tonnes_) || 0;
    productData[product] = (productData[product] || 0) + quantity;
  });

  const labels = Object.keys(productData);
  const values = Object.values(productData);

  const ctx = document.getElementById('barChart').getContext('2d');
  if (window.barChartInstance) window.barChartInstance.destroy();

  window.barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Quantity (000 Metric Tonnes)',
        data: values,
        backgroundColor: '#0074D9'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Production by Product',
          font: { size: 20 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Quantity (000 Metric Tonnes)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Product'
          }
        }
      }
    }
  });
}