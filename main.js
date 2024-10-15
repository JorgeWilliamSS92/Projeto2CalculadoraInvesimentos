const buttonCalculation = document.getElementsByClassName("button-calculation");

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const initialInvestment = document.getElementById("initial-investment");
  const contribution = document.getElementById("contribution");
  const term = document.getElementById("term");
  const termPeriod = document.getElementById("term-period");
  const profitability = document.getElementById("profitability");
  const profitabilityPeriod = document.getElementById("profitability-period");
  const tax = document.getElementById("tax");

  let termNew = term.value;
  if (termPeriod.value === "yearly") {
    termNew = termNew * 12;
  }

  let profitabilityNew = profitability.value;
  if (profitabilityPeriod.value === "yearly") {
    profitabilityNew = profitabilityNew / 12;
  }

  const investmentObject = {
    investmentMonthly: Number(initialInvestment.value),
    monthlyIncome: 0,
    termMonthly: 0,
    monthlyTax: 0,
    totalAmount: Number(initialInvestment.value),
  };

  const investmentArray = [];
  investmentArray.push(investmentObject);
  // console.log(investmentArray);

  for (let n = 1; n <= termNew; n++) {
    const obj = {
      investmentMonthly:
        investmentArray[n - 1].investmentMonthly + Number(contribution.value),
      monthlyIncome:
        investmentArray[n - 1].totalAmount * (Number(profitabilityNew) / 100),
      termMonthly: n,
      monthlyTax:
        investmentArray[n - 1].totalAmount *
        (Number(profitabilityNew) / 100) *
        Number(tax.value / 100),
      totalAmount:
        investmentArray[n - 1].investmentMonthly +
        Number(contribution.value) +
        investmentArray[n - 1].totalAmount * (Number(profitabilityNew) / 100) -
        investmentArray[n - 1].totalAmount *
          (Number(profitabilityNew) / 100) *
          Number(tax.value / 100),
    };
    investmentArray.push(obj);
  }

  console.log(investmentArray);
});

// adcionando comentário
