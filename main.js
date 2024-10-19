export function generateReturnArray(
  initialInvestment = 0,
  contribution = 0,
  term = 0,
  termPeriod = "monthly",
  profitability = 0,
  profitabilityP = "monthly",
  tax = 0
) {
  //Fazendo o reconhecimento do tipo de input dos períodos e convertendo quando necessário
  function returningProfitability(n) {
    return n ** (1 / 12);
  }
  const termNew = termPeriod === "monthly" ? term : term * 12;

  const profitabilityN =
    profitabilityP === "monthly"
      ? Number(profitability / 100)
      : returningProfitability(Number(1 + profitability / 100)) - 1;

  const taxN = returningProfitability(Number(tax / 100));

  const investmentObject = {
    investmentMonthly: Number(initialInvestment),
    monthlyIncome: 0,
    monthlyPeriod: 0,
    totalInterestReturn: 0,
    totalAmount: Number(initialInvestment),
  };

  const investmentArray = [investmentObject];
  // investmentArray.push(investmentObject); ou poderia usar um push

  for (let n = 1; n <= termNew; n++) {
    const investmentMonthly =
      Number(investmentArray[n - 1].investmentMonthly) + Number(contribution);
    const monthlyIncome = Number(
      investmentArray[n - 1].totalAmount * profitabilityN
    );
    const monthlyPeriod = n;
    const totalInterestReturn =
      monthlyIncome + investmentArray[n - 1].totalInterestReturn;
    const totalAmount = investmentMonthly + totalInterestReturn;

    investmentArray.push({
      investmentMonthly: investmentMonthly,
      monthlyIncome: monthlyIncome,
      monthlyPeriod: monthlyPeriod,
      totalInterestReturn: totalInterestReturn,
      totalAmount: totalAmount,
    });
  }

  return investmentArray;
}

// adcionando comentário
