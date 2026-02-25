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
        tension: 0.4,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#e6f1ff" } }
      },
      scales: {
        x: {
          ticks: { color: "#8fb8ff" },
          grid: { color: "rgba(255,255,255,0.05)" }
        },
        y: {
          ticks: { color: "#8fb8ff" },
          grid: { color: "rgba(255,255,255,0.05)" }
        }
      }
    }
  });

  async function fetchMarketData() {
    try {

      const proxy = "https://api.allorigins.win/raw?url=";
      const url = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^GSPC";

      const response = await fetch(proxy + encodeURIComponent(url));
      const data = await response.json();

      const market = data.quoteResponse.result[0];
      const marketPrice = market.regularMarketPrice;
      const marketChange = market.regularMarketChangePercent;

      // Generate Business Metrics
      const revenue = marketPrice * 1000;
      const growth = marketChange;
      const expenses = revenue * 0.4;
      const profit = revenue - expenses;

      // Update UI
      document.getElementById("revenue").textContent =
        "$" + revenue.toFixed(0);

      const growthElement = document.getElementById("growth");
      growthElement.textContent = growth.toFixed(2) + "%";
      growthElement.style.color = growth >= 0 ? "#22c55e" : "#ef4444";

      document.getElementById("expenses").textContent =
        "$" + expenses.toFixed(0);

      document.getElementById("profit").textContent =
        "$" + profit.toFixed(0);

      // Update Chart
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
      console.error("Error:", error);
    }
  }

  fetchMarketData();
  setInterval(fetchMarketData, 60000);

});
