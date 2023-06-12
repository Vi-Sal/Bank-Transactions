// Selections
const btnLogin = document.querySelector(".btn-login");
const btnCreate = document.querySelector(".btn-create");
const ipUsername = document.querySelector(".ip-user");
const ipPass = document.querySelector(".ip-pass");
const formContainer = document.querySelector(".form-container");
const mainContainer = document.querySelector(".main-container");
const curUser = document.querySelector(".cur-user > span");
const btnLogout = document.querySelector(".btn-logout");
const header = document.querySelector("header");
const transContainer = document.querySelector(".trans-container");
const totalAmount = document.querySelector(".amount > label");

const ipDeposit = document.querySelector(".ip-deposit");
const btnDeposit = document.querySelector(".btn-deposit");

const ipTransferTo = document.querySelector(".ip-transfer-to");
const ipTransferAmount = document.querySelector(".ip-transfer-amount");
const btnTransfer = document.querySelector(".btn-transfer");

// Declarations
const accounts = [
	{
		id: "1000",
		name: "Admin",
		trans: [200, -300, 400, 350, 340, -20, -50, 600],
		user: "admin",
		pass: "123",
	},
	{
		id: "1001",
		name: "Visal_SAN",
		trans: [260, -30, 430, -85, 700, -330, -200, 450, 780, 350],
		user: "sal",
		pass: "123",
	},
	{
		id: "1002",
		name: "Huor_KAO",
		trans: [900, -350, 40, 85, -200, 350, 200, -150],
		user: "huor",
		pass: "123",
	},
	{
		id: "1003",
		name: "Nith_CHAN",
		trans: [230, -250, 900, 760, -320, -290, 400, 650, 700],
		user: "nith",
		pass: "123",
	},
];
let curAccount = "";

// Functionality

function switchUser(acc) {
	curUser.textContent = acc.name.toUpperCase();
}

function login(e) {
	e.preventDefault();
	const userName = ipUsername.value;
	let found = false;
	accounts.forEach((account) => {
		// console.log(account);
		if (account.user === userName) {
			// const password = window.prompt("Input Password : ");
			const password = ipPass.value;
			if (password === account.pass) {
				curAccount = account;
				formContainer.reset();
				// console.log("Login successful ... !");
				mainContainer.classList.add("show");
				header.classList.add("show");
				formContainer.classList.remove("show");
				switchUser(account);
				addTrans(account);
			} else {
				alert("Wrong password");
			}
			found = true;
		}
	});
	if (!found) {
		alert("Invalid Username ... !");
	}
}

// Loggout
function logout(e) {
	e.preventDefault();
	mainContainer.classList.remove("show");
	header.classList.remove("show");
	formContainer.classList.add("show");
}

// ADD and Update Transactions
function addTrans(account) {
	let html = "";
	let sum = 0;
	account.trans.forEach((tran) => {
		sum += tran;
		if (tran > 0) {
			html = `	<div class="trans">
							<div class="stt stt-deposit">DEPOSIT</div>
							<p>${tran}$</p>
						</div>`;
		} else {
			html = `	<div class="trans">
							<span class="stt stt-withdrawal">WITHDRAWAL</span>
							<p>${tran}$</p>
						</div> `;
		}
		// transContainer.innerHTML += html;
		transContainer.insertAdjacentHTML("afterbegin", html);
	});

	// const amount = account.trans.reduce((sum, tran) => sum + tran);
	// console.log(amount);
	// console.log(sum);

	totalAmount.textContent = `${sum}$`;
}

// Make Deposits
function makeDeposit() {
	const deposit = Number(ipDeposit.value);
	curAccount.trans.push(deposit);
	addTrans(curAccount);
	ipDeposit.value = "";
}

// Transfer Transactions
function transfer() {
	const user = ipTransferTo.value;
	const amount = Number(ipTransferAmount.value);
	accounts.forEach((acc) => {
		if (acc.user === user && amount > 0 && user !== curAccount.user) {
			curAccount.trans.push(-amount);
			addTrans(curAccount);
			acc.trans.push(amount);
			ipTransferTo.value = "";
			ipTransferAmount.value = "";
		}
	});
}
addTrans(accounts[1]);
// Event handlers
btnLogin.addEventListener("click", login);
btnLogout.addEventListener("click", logout);
btnDeposit.addEventListener("click", makeDeposit);
btnTransfer.addEventListener("click", transfer);
