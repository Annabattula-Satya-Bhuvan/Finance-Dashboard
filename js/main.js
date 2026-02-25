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

      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const targetUrl =
        "https://query1.finance.yahoo.com/v7/finance/quote?symbols=^GSPC";

      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      const data = await response.json();

      const market = data.quoteResponse.result[0];
      const marketPrice = market.regularMarketPrice;
      const marketChange = market.regularMarketChangePercent;

      // Generate business metrics based on live market
      const totalRevenue = marketPrice * 1000;
      const monthlyGrowth = marketChange;
      const expenses = totalRevenue * 0.35;
      const netProfit = totalRevenue - expenses;

      // Update UI
      document.querySelectorAll(".stat-card h2")[0].textContent =
        "$" + totalRevenue.toFixed(0);

      document.querySelectorAll(".stat-card h2")[1].textContent =
        monthlyGrowth.toFixed(2) + "%";

      document.querySelectorAll(".stat-card h2")[2].textContent =
        "$" + expenses.toFixed(0);

      document.querySelectorAll(".stat-card h2")[3].textContent =
        "$" + netProfit.toFixed(0);

      // Color growth
      const growthElement = document.querySelectorAll(".stat-card h2")[1];
      growthElement.style.color =
        monthlyGrowth >= 0 ? "#22c55e" : "#ef4444";

      // Update chart
      if (revenueHistory.length >= 20) {
        revenueHistory.shift();
        timeLabels.shift();
      }

      revenueHistory.push(totalRevenue);
      timeLabels.push(new Date().toLocaleTimeString());

      chart.update();

    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  fetchMarketData();
  setInterval(fetchMarketData, 60000);

});
