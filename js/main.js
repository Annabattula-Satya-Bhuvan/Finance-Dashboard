const ctx = document.getElementById("revenueChart").getContext("2d");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Revenue ($)",
      data: [12000, 19000, 15000, 22000, 26000, 30000],
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56,189,248,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: "#7dd3fc"
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#e6f1ff"
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#8fb8ff"
        },
        grid: {
          color: "rgba(255,255,255,0.05)"
        }
      },
      y: {
        ticks: {
          color: "#8fb8ff"
        },
        grid: {
          color: "rgba(255,255,255,0.05)"
        }
      }
    }
  }
});
