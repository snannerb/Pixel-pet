import { renderLogin, getUserFromStorage, saveUserToStorage, clearStorage } from './utils.js';
import { renderDashboard, initPetLifecycle } from './pet.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  const storedUser = getUserFromStorage();
  if (storedUser) {
  renderDashboard(storedUser);
    initPetLifecycle();
  } else {
    renderLogin();
  }

  app.addEventListener('submit', (e) => {
    if (e.target.id === 'loginForm') {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      login(username, password);
    }
  });

  app.addEventListener('click', (e) => {
    if (e.target.id === 'signupBtn') {
      signup();
    }
  });
});

function login(username, password) {
  const storedUser = getUserFromStorage();
  if (storedUser && storedUser.username === username && storedUser.password === hashPassword(password)) {
    alert('Login successful!');
    renderDashboard(storedUser);
    initPetLifecycle();
  } else {
    alert('Invalid username or password.');
  }
}

function signup() {
  const username = prompt('Enter a username:');
  const password = prompt('Enter a password:');
  if (username && password) {
    const user = { id: crypto.randomUUID(), username, password: hashPassword(password) };
    saveUserToStorage(user);
    alert('Signup successful!');
    renderLogin();
  }
}

function hashPassword(password) {
  // Simple hashing for demo purposes
  return password.split('').reverse().join('');
}