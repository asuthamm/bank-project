// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const serverUrl = 'http://localhost:5000/api';

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

const routes = {
  '/dashboard': { title: 'My Account', templateId: 'dashboard', init: refresh },
  '/login': { title: 'Login', templateId: 'login' }
};

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  updateRoute();
}

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate('/dashboard');
  }

  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(view);
  
  if (route.init) {
    route.init();
  }
}

// ---------------------------------------------------------------------------
// API interactions
// ---------------------------------------------------------------------------

async function sendRequest(api, method, body) {
  try {
    const response = await fetch(serverUrl + api, {
      method: method || 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
}

async function getAccount(user) {
  return sendRequest('/accounts/' + user);
}

async function createAccount(account) {
  return sendRequest('/accounts', 'POST', account);
}

async function createTransaction(user, transaction) {
  return sendRequest('/accounts/' + user + '/transactions', 'POST', transaction);
}

// ---------------------------------------------------------------------------
// Global state
// ---------------------------------------------------------------------------

let state = {
  user: 'toto2',
  account: null
};

function updateState(newState) {
  state = newState;
}

// ---------------------------------------------------------------------------
// Login/register
// ---------------------------------------------------------------------------

async function login() {
  const loginForm = document.getElementById('loginForm')
  const user = loginForm.user.value;
  const data = await getAccount(user);

  if (data.error) {
    return updateText('loginError', data.error);
  }

  state.user = data.user;
  navigate('/dashboard');
}

async function register() {
  const registerForm = document.getElementById('registerForm');
  const formData = new FormData(registerForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const data = await createAccount(jsonData);

  if (data.error) {
    return updateText('registerError', data.error);
  }

  state.user = data.user;
  navigate('/dashboard');
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

async function updateAccountData() {
  const user = state.user;

  if (!user) {
    navigate('/login');
  }

  const data = await getAccount(user);

  if (data.error) {
    return updateText('dashboardError', data.error);
  }

  console.log(data)
  state.account = data;
}

async function refresh() {
  await updateAccountData();
  updateDashboard();
}

function updateDashboard() {
  const account = state.account;
  updateText('description', account.description);
  updateText('balance', account.balance);
  updateText('currency', account.currency);
}

function addTransaction() {
  const dialog = document.getElementById('transactionDialog');
  dialog.classList.add('show');

  // Reset form
  const transactionForm = document.getElementById('transactionForm');
  transactionForm.reset();

  // Set date to today
  transactionForm.date.valueAsDate = new Date();
}

async function confirmTransaction() {
  const dialog = document.getElementById('transactionDialog');
  dialog.classList.remove('show');

  const transactionForm = document.getElementById('transactionForm');

  const formData = new FormData(transactionForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const data = await createTransaction(state.user, jsonData);

  if (data.error) {
    return updateText('transactionError', data.error);
  }

  // Update local state with new transaction
  state.account.transactions.push(data);
  state.account.balance += data.amount;

  // Update display
  updateDashboard();
}

async function cancelTransaction() {
  const dialog = document.getElementById('transactionDialog');
  dialog.classList.remove('show');

}

function logout() {
  navigate('/login')
}

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------

function updateText(id, text) {
  const element = document.getElementById(id);
  element.innerHTML = text;
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

function init() {
  // Update route for browser back/next buttons
  window.onpopstate = () => updateRoute();
  updateRoute();
}

init();
