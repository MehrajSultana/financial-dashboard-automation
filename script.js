const refreshBtn = document.getElementById("refreshBtn");
const exportBtn = document.getElementById("exportBtn");
const transactionBody = document.getElementById("transactionBody");
const filterButtons = document.querySelectorAll(".filter-btn");

let transactions = [
  { date: "2026-03-01", department: "Operations", type: "Expense", amount: 12500, status: "Pending" },
  { date: "2026-03-02", department: "Sales", type: "Revenue", amount: 28900, status: "Completed" },
  { date: "2026-03-03", department: "IT", type: "Expense", amount: 8200, status: "Completed" },
  { date: "2026-03-04", department: "Finance", type: "Revenue", amount: 17400, status: "In Review" },
  { date: "2026-03-05", department: "Marketing", type: "Expense", amount: 6750, status: "Completed" },
  { date: "2026-03-06", department: "HR", type: "Expense", amount: 4300, status: "Pending" },
  { date: "2026-03-07", department: "Enterprise Sales", type: "Revenue", amount: 32100, status: "Completed" }
];

function getBadgeClass(status) {
  if (status === "Completed") return "completed";
  if (status === "Pending") return "pending";
  return "inreview";
}

function renderTransactions(filter = "all") {
  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((item) => item.type === filter);

  transactionBody.innerHTML = filteredTransactions
    .map(
      (item) => `
      <tr>
        <td>${item.date}</td>
        <td>${item.department}</td>
        <td>${item.type}</td>
        <td>$${item.amount.toLocaleString()}</td>
        <td><span class="badge ${getBadgeClass(item.status)}">${item.status}</span></td>
      </tr>
    `
    )
    .join("");
}

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

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderTransactions(button.dataset.filter);
  });
});

exportBtn.addEventListener("click", () => {
  const headers = ["Date,Department,Type,Amount,Status"];
  const rows = transactions.map(
    (item) =>
      `${item.date},${item.department},${item.type},${item.amount},${item.status}`
  );

  const csvContent = [...headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "financial-transactions.csv";
  link.click();

  URL.revokeObjectURL(url);
});

renderTransactions();
