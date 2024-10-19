import Chart from "chart.js/auto";
import { generateReturnArray } from "./main.js";

const click = document.getElementById("click");
click.addEventListener("click", generate);

const doughnut = document.getElementById("doughnut");
const bar = document.getElementById("bar");
let chart1 = {};
let chart2 = {};

function generate(event) {
  event.preventDefault();

  const initialInvestment = document.getElementById("initial-investment").value;
  const contribution = document.getElementById("contribution").value;
  const term = document.getElementById("term").value;
  const termPeriod = document.getElementById("term-period").value;
  const profitability = document.getElementById("profitability").value;
  const profitabilityP = document.getElementById("profitability-period").value;
  const tax = document.getElementById("tax").value;

  const arraytesting = generateReturnArray(
    initialInvestment,
    contribution,
    term,
    termPeriod,
    profitability,
    profitabilityP,
    tax
  );

  function checking(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!checking(chart1) && !checking(chart2)) {
    chart1.destroy();
    chart2.destroy();
  }

  console.log(arraytesting);

  chart1 = new Chart(doughnut, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimentos", "Imposto"],
      datasets: [
        {
          label: "Valor R$",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  chart2 = new Chart(bar, {
    type: "bar",
    data: {
      labels: ["labels", "novo", "velho", "testando"],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
