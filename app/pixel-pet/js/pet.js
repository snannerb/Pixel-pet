import { getPetFromStorage, savePetToStorage, clearStorage } from './utils.js';

let pet = getPetFromStorage() || {};
let petAge = pet.age || 0;
let lastFed = pet.lastFed || Date.now();

export function renderDashboard(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Welcome, ${user.username}!</h2>
    <div id="petDashboard"></div>
  `;
  displayPet();
  startFeedingCountdown();
}

export function initPetLifecycle() {
  if (!pet.status) {
    pet = { status: 'egg', hatchTime: Date.now() + 3 * 24 * 60 * 60 * 1000 };
    savePetToStorage(pet);
  }
  if (pet.status === 'egg' && Date.now() >= pet.hatchTime) {
    hatchEgg();
  }
  if (pet.status === 'alive') {
    updatePetAge();
  }
}

function hatchEgg() {
  pet.status = 'alive';
  pet.attributes = generateAttributes();
  pet.name = prompt('Name your pet:');
  pet.age = 0;
  pet.lastFed = Date.now();
  savePetToStorage(pet);
  displayPet();
  updatePetAge();
}

function generateAttributes() {
  return {
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    pattern: ['stripes', 'spots'][Math.floor(Math.random() * 2)],
    size: Math.floor(Math.random() * 10) + 5
  };
}

function displayPet() {
  const petDashboard = document.getElementById('petDashboard');
  petDashboard.innerHTML = `
    <h3>Your Pet: ${pet.name || 'Unnamed'}</h3>
    <div class="pet" style="background-color: ${pet.attributes.color}; width: ${pet.attributes.size * 10}px; height: ${pet.attributes.size * 10}px;"></div>
    <button id="feedBtn">Feed</button>
    <button id="resetBtn">Reset</button>
  `;

  const feedBtn = document.getElementById('feedBtn');
  const resetBtn = document.getElementById('resetBtn');
  feedBtn.addEventListener('click', feedPet);
  resetBtn.addEventListener('click', resetPet);
}

function feedPet() {
  lastFed = Date.now();
  pet.lastFed = lastFed;
  savePetToStorage(pet);
  console.log('Pet fed!');
  startFeedingCountdown();
}

function startFeedingCountdown() {
  setTimeout(() => {
    if (Date.now() - lastFed >= 3 * 24 * 60 * 60 * 1000) {
      pet.status = 'dead';
      savePetToStorage(pet);
  console.log('Your pet has died due to starvation.');
      displayPet();
    }
  }, 3 * 24 * 60 * 60 * 1000);
}

function resetPet() {
  pet = {};
  clearStorage();
  displayPet();
  alert('Pet reset. Start over!');
}

function updatePetAge() {
  setInterval(() => {
  petAge++;
    pet.age = petAge;
    savePetToStorage(pet);
    console.log(`Pet age: ${petAge} days`);
    updatePetVisuals();
  }, 24 * 60 * 60 * 1000);
}

function updatePetVisuals() {
  const petDiv = document.querySelector('#petDashboard div');
  petDiv.style.transform = `scale(${1 + petAge * 0.1})`;
}