const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {
  const revenue = document.getElementById("revenue");
  const expenses = document.getElementById("expenses");
  const profit = document.getElementById("profit");
  const automation = document.getElementById("automation");

  const revenueValue = 240000 + Math.floor(Math.random() * 20000);
  const expenseValue = 145000 + Math.floor(Math.random() * 15000);
  const profitValue = revenueValue - expenseValue;
  const automationValue = 70 + Math.floor(Math.random() * 15);

  revenue.textContent = `$${revenueValue.toLocaleString()}`;
  expenses.textContent = `$${expenseValue.toLocaleString()}`;
  profit.textContent = `$${profitValue.toLocaleString()}`;
  automation.textContent = `${automationValue}%`;

  alert("Dashboard data refreshed successfully.");
});
