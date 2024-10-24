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

    const thead0 = document.getElementById("thead");
    const tbody0 = document.getElementById("tbody");
    thead0.innerHTML = "";
    tbody0.innerHTML = "";
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

  const thead = document.getElementById("thead");
  const tbody = document.getElementById("tbody");

  thead.innerHTML = `<tr>
                <th>Mês</th>
                <th>Investimento Mensal</th>
                <th>Rendimento Mensal</th>
                <th>Rendimento Acumulado</th>
                <th>Acumulado Total</th>
              </tr>`;

  let html = "";
  const arrayNew2 = arraytesting;

  function formatCurrencyall(v) {
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  for (let i = 0; i < arrayNew2.length; i++) {
    const investment = formatCurrencyall(arrayNew2[i].investmentMonthly);
    const returnAll = formatCurrencyall(arrayNew2[i].totalInterestReturn);
    const income = formatCurrencyall(arrayNew2[i].monthlyIncome);
    const total = formatCurrencyall(arrayNew2[i].totalAmount);

    console.log(investment, returnAll, income, total);
    html += `<tr >
                <td>${arrayNew2[i].monthlyPeriod}</td>
                <td>${investment}</td>
                <td>${income}</td>
                <td>${returnAll}</td>
                <td>${total}</td>
              </tr>`;
  }

  tbody.innerHTML = html;
}
