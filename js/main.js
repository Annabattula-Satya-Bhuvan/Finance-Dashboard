document.addEventListener("DOMContentLoaded", function () {

  const revenueEl = document.getElementById("revenue");
  const growthEl = document.getElementById("growth");
  const expensesEl = document.getElementById("expenses");
  const profitEl = document.getElementById("profit");
  const ctx = document.getElementById("revenueChart");

  if (!revenueEl || !growthEl || !expensesEl || !profitEl || !ctx) {
    console.log("Element missing!");
    return;
  }

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

  function updateData() {

    const randomChange = (Math.random() - 0.5) * 2;

    growth += randomChange;
    revenue += revenue * (randomChange / 100);

    const expenses = revenue * 0.4;
    const profit = revenue - expenses;

    revenueEl.textContent = "$" + revenue.toFixed(0);

    growthEl.textContent = growth.toFixed(2) + "%";
    growthEl.style.color = growth >= 0 ? "green" : "red";

    expensesEl.textContent = "$" + expenses.toFixed(0);
    profitEl.textContent = "$" + profit.toFixed(0);

    if (revenueHistory.length >= 20) {
      revenueHistory.shift();
      timeLabels.shift();
    }

    revenueHistory.push(revenue);
    timeLabels.push(new Date().toLocaleTimeString());
    chart.update();
  }

  updateData();
  setInterval(updateData, 60000);

});
