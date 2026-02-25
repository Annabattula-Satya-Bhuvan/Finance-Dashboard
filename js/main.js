document.addEventListener("DOMContentLoaded", function () {

  const ctx = document.getElementById("revenueChart");
  if (!ctx) return;

  let revenue = 120000;
  let growth = 5;
  let revenueHistory = [];
  let timeLabels = [];

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [{
        label: "Total Revenue ($)",
        data: revenueHistory,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  function generateLiveData() {

    // Simulate market fluctuation
    const randomChange = (Math.random() - 0.5) * 2;
    growth = growth + randomChange;
    revenue = revenue + revenue * (randomChange / 100);

    const expenses = revenue * 0.4;
    const profit = revenue - expenses;

    // Update UI
    document.getElementById("revenue").textContent =
      "$" + revenue.toFixed(0);

    const growthElement = document.getElementById("growth");
    growthElement.textContent =
      growth.toFixed(2) + "%";
    growthElement.style.color =
      growth >= 0 ? "#22c55e" : "#ef4444";

    document.getElementById("expenses").textContent =
      "$" + expenses.toFixed(0);

    document.getElementById("profit").textContent =
      "$" + profit.toFixed(0);

    // Update chart
    if (revenueHistory.length >= 20) {
      revenueHistory.shift();
      timeLabels.shift();
    }

    revenueHistory.push(revenue);
    timeLabels.push(new Date().toLocaleTimeString());
    chart.update();
  }

  generateLiveData();
  setInterval(generateLiveData, 60000);

});
