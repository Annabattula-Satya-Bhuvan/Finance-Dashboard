document.addEventListener("DOMContentLoaded", function () {

  const ctx = document.getElementById("revenueChart");
  if (!ctx) return;

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

  async function fetchMarketData() {
    try {

      const response = await fetch(
        "https://financialmodelingprep.com/api/v3/quote/%5EGSPC?apikey=demo"
      );

      const data = await response.json();
      if (!data || data.length === 0) return;

      const marketPrice = data[0].price;
      const marketChange = data[0].changesPercentage;

      // Generate business metrics
      const revenue = marketPrice * 1000;
      const growth = marketChange;
      const expenses = revenue * 0.4;
      const profit = revenue - expenses;

      // Update numbers
      document.getElementById("revenue").textContent =
        "$" + revenue.toFixed(0);

      const growthElement = document.getElementById("growth");
      growthElement.textContent = growth.toFixed(2) + "%";
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

    } catch (error) {
      document.getElementById("status").textContent = "Error";
      document.getElementById("status").className = "negative";
      console.error("Fetch error:", error);
    }
  }

  fetchMarketData();
  setInterval(fetchMarketData, 60000);

});
