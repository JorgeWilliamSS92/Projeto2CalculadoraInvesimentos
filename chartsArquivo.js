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

  const arrayNew = arraytesting[arraytesting.length - 1];
  console.log(arrayNew);

  function fix(n) {
    return n.toFixed(2);
  }

  if (!checking(chart1) && !checking(chart2)) {
    chart1.destroy();
    chart2.destroy();
  }

  chart1 = new Chart(doughnut, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimentos", "Imposto"],
      datasets: [
        {
          label: "Valor R$",
          data: [
            fix(arrayNew.investmentMonthly),
            fix(arrayNew.totalInterestReturn),
            fix(arrayNew.totalInterestReturn * (tax / 100)),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
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
      labels: arraytesting.map((month) => month.monthlyPeriod),
      datasets: [
        {
          label: "Investimento",
          data: arraytesting.map((invested) => fix(invested.investmentMonthly)),

          backgroundColor: "rgba(255, 99, 132)",
        },
        {
          label: "Rendimento",
          data: arraytesting.map((returnV) => fix(returnV.totalInterestReturn)),
          backgroundColor: "rgba(75, 192, 192)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}
