document.addEventListener("DOMContentLoaded", function () {

  const ctx = document.getElementById("revenueChart");
  if (!ctx) return;

  let priceHistory = [];
  let timeLabels = [];

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [{
        label: "AAPL Price ($)",
        data: priceHistory,
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
        legend: {
          labels: { color: "#e6f1ff" }
        }
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
      const response = await fetch(
        "https://query1.finance.yahoo.com/v7/finance/quote?symbols=AAPL,^GSPC"
      );

      const data = await response.json();
      const results = data.quoteResponse.result;

      const apple = results.find(item => item.symbol === "AAPL");
      const sp500 = results.find(item => item.symbol === "^GSPC");

      if (!apple || !sp500) return;

      const price = apple.regularMarketPrice;
      const change = apple.regularMarketChangePercent;
      const spPrice = sp500.regularMarketPrice;

      document.getElementById("stock-price").textContent =
        "$" + price.toFixed(2);

      const changeElement = document.getElementById("stock-change");
      changeElement.textContent = change.toFixed(2) + "%";
      changeElement.style.color = change >= 0 ? "#22c55e" : "#ef4444";

      document.getElementById("sp500-price").textContent =
        "$" + spPrice.toFixed(2);

      document.getElementById("last-updated").textContent =
        new Date().toLocaleTimeString();

      // Update chart
      if (priceHistory.length >= 20) {
        priceHistory.shift();
        timeLabels.shift();
      }

      priceHistory.push(price);
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
