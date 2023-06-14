import React from 'react'
import "./NavBar1Styles.css";

export default function NavBar1() {
  return (
    <>
    <nav>
        <div>
            <ul id='navBar'>
                <li><a href='/ExpensesList' class='expenselist-btn'>Expenses List</a></li>
                <li><a href='/IncomeList' class='incomelist-btn'>Income List</a></li>
                <li><a href='/DashBoard' class='dashboard-btn'>Dashboard</a></li>
                <li><a href='/Profile' class='profile-btn'>Profile</a></li>
                <li><a href='/AddExpense' class='expense-btn'>New Expense</a></li>
                <li><a href='/AddIncome' class='income-btn'>New Income</a></li>
                <li><a href='/Logout' class='logout-btn'>Logout</a></li>
            </ul>
        </div>
    </nav>
    </>
  )
}

