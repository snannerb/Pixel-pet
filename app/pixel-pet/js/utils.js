// Utility functions
export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <label for="username">Username:</label>
      <input type="text" id="username" required>
      <label for="password">Password:</label>
      <input type="password" id="password" required>
      <button type="submit">Login</button>
    </form>
    <button id="signupBtn">Sign Up</button>
  `;
}

export function getUserFromStorage() {
  return JSON.parse(localStorage.getItem('user')) || null;
}

export function saveUserToStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getPetFromStorage() {
  return JSON.parse(localStorage.getItem('pet')) || null;
}

export function savePetToStorage(pet) {
  localStorage.setItem('pet', JSON.stringify(pet));
}

export function clearStorage() {
  localStorage.removeItem('user');
  localStorage.removeItem('pet');
}