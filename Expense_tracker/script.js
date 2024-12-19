document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();
  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = expenseAmountInput.value.trim();
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpenseToLocal();
      renderExpenses();
      updateTotal();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
      ${expense.name} - $${expense.amount}
      <button data-id="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  function calculateTotal() {
    return expenses.reduce((acc, expense) => {
      return acc + parseInt(expense.amount);
    }, 0);
  }
  function saveExpenseToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed();

    expenseList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const expenseId = parseInt(e.target.getAttribute("data-id"));
        expenses = expenses.filter((expense) => expense.id !== expenseId);

        saveExpenseToLocal();
        renderExpenses();
        updateTotal();
      }
    });
  }
});
