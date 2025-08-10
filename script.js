// Chart data arrays
let labels = [];
let temps = [];
let moistures = [];

// Chart setup
const ctx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temps,
                borderColor: 'green',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Moisture (%)',
                data: moistures,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }
        ]
    }
});

// Add data to table and chart
function addData(label, temp, moist) {
    labels.push(label);
    temps.push(temp);
    moistures.push(moist);
    updateTable();
    tempChart.update();
}

// Update HTML table
function updateTable() {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';
    labels.forEach((label, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${label}</td>
            <td>${temps[index]}</td>
            <td>${moistures[index]}</td>
            <td><button class="removeBtn" onclick="removeData(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Remove a data point
function removeData(index) {
    labels.splice(index, 1);
    temps.splice(index, 1);
    moistures.splice(index, 1);
    updateTable();
    tempChart.update();
}

// Handle form submission
document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const label = document.getElementById('labelInput').value;
    const temp = parseFloat(document.getElementById('tempInput').value);
    const moist = parseFloat(document.getElementById('moistInput').value);

    addData(label, temp, moist);
    this.reset();
});
