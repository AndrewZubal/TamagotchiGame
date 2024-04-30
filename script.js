class Tamagotchi {
  // Constructor to initialize Tamagotchi properties
  constructor(name) {
    this.name = "";
    this.hunger = this.sleepiness = this.boredom = 5;
    this.age = 0;
    this.alive = true;
    this.evolved = false;
  }

  // Methods to perform actions and update metrics
  feed() { this.hunger > 0 && (this.hunger--, this.updateMetrics()); }
  turnOffLights() { this.sleepiness > 0 && (this.sleepiness--, this.updateMetrics()); }
  play() { this.boredom > 0 && (this.boredom--, this.updateMetrics()); }
  namePet(name) { this.name = name; }

  // Method to update UI metrics and check for game over or evolution
  updateMetrics() {
    ['hunger', 'sleepiness', 'boredom', 'age'].forEach(metric =>
      document.getElementById(metric).innerText = this[metric]
    );

    if ([this.hunger, this.sleepiness, this.boredom].some(metric => metric === 10)) {
      this.alive = false;
      this.gameOver();
    } else if (this.age === 5 && !this.evolved) this.evolve();
  }

  // Method to increase hunger, boredom, sleepiness, and age over time
  increaseMetric(metric, interval) {
    setInterval(() => {
      if (this.alive) {
        this[metric]++;
        this.updateMetrics();
      }
    }, interval);
  }

  // Method to evolve the Tamagotchi
  evolve() {
    this.evolved = true;
    const petElement = document.getElementById('pet');
    petElement.src = "img/buffdawg.png";
    petElement.onload = () => {
      petElement.width /= 4;
      petElement.height /= 1.5;
    };
  }

  // Method to display game over message
  gameOver() { alert(`${this.name} has passed away. Game over!`); }
}

let pet;

// Event handler functions
function feed() { pet.feed(); }
function turnOffLights() { pet.turnOffLights(); }
function play() { pet.play(); }

// Function to name the pet
function namePet() {
  const name = document.getElementById('petNameInput').value;
  document.getElementById('statusHeader').innerText = `${name}'s Status`;
  pet.namePet(name);
}

// Initialize Tamagotchi instance and start metric increase intervals
window.onload = function() {
  const name = "";
  pet = new Tamagotchi(name);
  ['increaseAge', 'increaseHunger', 'increaseBoredom', 'increaseSleepiness'].forEach(method =>
    pet[method]()
  );
  const petElement = document.getElementById('pet');
  petElement.width /= 8;
  petElement.height /= 8;
};

// Function to make pet move back and forth on the screen
let direction = 1;
setInterval(() => {
  const petElement = document.getElementById('pet');
  const currentLeft = parseInt(window.getComputedStyle(petElement).left);
  const windowWidth = window.innerWidth;
  const petWidth = petElement.offsetWidth;

  if (currentLeft <= 0) {
    direction = 1;
    petElement.style.transform = 'scaleX(1)';
  } else if (currentLeft + petWidth >= windowWidth) {
    direction = -1;
    petElement.style.transform = 'scaleX(-1)';
  }

  const newX = currentLeft + direction * 5;
  petElement.style.left = newX + 'px';
}, 100);