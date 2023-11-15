document.addEventListener('DOMContentLoaded', function() {
    const updateGraphBtn = document.getElementById('update-graph');
    const runsInput = document.getElementById('runs');
    const oversInput = document.getElementById('overs');
    const runRateOutput = document.querySelector('.run-rate p');
    const predictedScoreOutput = document.querySelector('.predicted-score p');
    const statItems = document.querySelectorAll('.stat p');
    
    // Initialize data for chart
    let chartData = {
      labels: [],
      datasets: [{
        label: 'Runs Scored',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
  
    let chartConfig = {
      type: 'line',
      data: chartData,
      options: {}
    };
  
    // Create a chart
    const ctx = document.querySelector('.line-chart').getContext('2d');
    let lineChart = new Chart(ctx, chartConfig);
  
    // Update graph button click event
    updateGraphBtn.addEventListener('click', function() {
      const runsInput = document.getElementById('runs');
      const oversInput = document.getElementById('overs');
  
      // Get the values from inputs
      const runs = parseInt(runsInput.value);
      const overs = parseInt(oversInput.value);

       if (!isNaN(runs) && !isNaN(overs) && overs !== 0) {
      // Calculate Net Run Rate (NRR)
      const nrr = runs / overs;
      runRateOutput.textContent = nrr.toFixed(2); // Display NRR in two decimal places

      // Calculate Expected Score
      const totalOvers = 50; // Assuming a total of 50 overs in an innings
      const expectedScore = (runs / overs) * totalOvers;
      predictedScoreOutput.textContent = Math.round(expectedScore);
    } else {
      runRateOutput.textContent = 'N/A'; // Display 'N/A' if input is invalid
      predictedScoreOutput.textContent = 'N/A'; // Display 'N/A' if input is invalid
    }
  
      // Update chart data
      lineChart.data.labels.push(`Over ${overs}`);
      lineChart.data.datasets[0].data.push(runs);
      lineChart.update();
  
      // Reset input fields
      runsInput.value = '';
      oversInput.value = '';
    });
  
    // Increment on click for stats
    statItems.forEach(item => {
      item.addEventListener('click', function() {
        let currentValue = parseInt(this.textContent);
        currentValue++;
        this.textContent = currentValue;
      });
    });

    const statButtons = document.querySelectorAll('.stats');

  statButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const labelForButton = document.querySelector(`label[for="${button.id}"]`);
      let currentValue = parseInt(labelForButton.textContent);
      
      if (event.button === 0) {
        currentValue++; // Increment if left-clicked
      } else if (event.button === 2) {
        currentValue = currentValue-1; // Decrement if right-clicked
      }
      
      labelForButton.textContent = currentValue < 0 ? 0 : currentValue;
    });

    // Prevent default right-click menu
    button.addEventListener('contextmenu', function(event) {
      event.preventDefault();
    });
  });  
});
