'use strict';

const newExpenseForm = document.querySelector('.new-expense');
const expenseTable = document.querySelector('.expense-table');

// **** FUNCTIONS ****
const noExpensesAdded = () => {
  if (!expenseTable.querySelector('tbody tr')) {
    return expenseTable.querySelector('tbody').insertAdjacentHTML(
      'beforeend',
      `
        <tr>
          <td colspan="4">No expenses added yet!</td>
        </tr>
      `
    );
  }

  return;
};

// **** EVENT LISTENERS ****
newExpenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const expenseName = formData.get('name');
  const date = formData.get('date');
  const amount = formData.get('amount');

  if (!expenseName || !date || !amount) return;

  if (expenseTable.querySelector('tbody tr td[colspan="4"]'))
    expenseTable
      .querySelector('tbody tr td[colspan="4"]')
      .closest('tr')
      .remove();

  expenseTable.querySelector('tbody').insertAdjacentHTML(
    'beforeend',
    `
      <tr>
        <td>${expenseName}</td>
        <td>${date}</td>
        <td>${amount}$</td>
        <td><span class="expense-table__delete">X</span></td>
      </tr>
  `
  );

  e.currentTarget.reset();
});

expenseTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('expense-table__delete')) {
    const deleteBtn = e.target;
    const row = deleteBtn.closest('tr');
    row.remove();
    noExpensesAdded();
  }
});
