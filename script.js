class Tamagotchi {
  constructor(name) {
    this.name = "";
    this.hunger = 5;
    this.sleepiness = 5;
    this.boredom = 5;
    this.age = 0;
    this.alive = true;
    this.evolved = false;
  }

  feed() {
    if (this.hunger > 0) {
      this.hunger--;
      this.updateMetrics();
    }
  }

  turnOffLights() {
    if (this.sleepiness > 0) {
      this.sleepiness--;
      this.updateMetrics();
    }
  }

  play() {
    if (this.boredom > 0) {
      this.boredom--;
      this.updateMetrics();
    }
  }

  namePet(name) {
    this.name = name;
  }

  updateMetrics() {
    document.getElementById('hunger').innerText = this.hunger;
    document.getElementById('sleepiness').innerText = this.sleepiness;
    document.getElementById('boredom').innerText = this.boredom;
    document.getElementById('age').innerText = this.age;

    if (this.hunger === 10 || this.sleepiness === 10 || this.boredom === 10) {
      this.alive = false;
      this.gameOver();
    }
    else if (this.age === 5 && !this.evolved) {
      this.evolve();
    }
  }

  increaseAge() {
    setInterval(() => {
      if (this.alive) {
        this.age++;
        this.updateMetrics();
      }
    }, 20000); 
  }
  increaseHunger() {
    setInterval(() => {
      if (this.alive) {
        this.hunger++;
        this.updateMetrics();
      }
    }, 10000); 
  }
  increaseBoredom() {
    setInterval(() => {
      if (this.alive) {
        this.boredom++;
        this.updateMetrics();
      }
    }, 10000); 
  }
  increaseSleepiness() {
    setInterval(() => {
      if (this.alive) {
        this.sleepiness++;
        this.updateMetrics();
      }
    }, 10000); 
  }

  evolve() {
    this.evolved = true;
    const petElement = document.getElementById('pet');
    petElement.src = "img/buffdawg.png";
    petElement.onload = function() {
      petElement.width = petElement.width / 4;
      petElement.height = petElement.height / 1.5;
    };
  }

  gameOver() {
    alert(`${this.name} has passed away. Game over!`);
  }
}

let pet;

function feed() {
  pet.feed();
}

function turnOffLights() {
  pet.turnOffLights();
}

function play() {
  pet.play();
}

function namePet() {
  const name = document.getElementById('petNameInput').value;
  const statusHeader = document.getElementById('statusHeader');
  statusHeader.innerText = `${name}'s Status`;


pet.namePet(name);
}

window.onload = function() {
  const name = "";
  pet = new Tamagotchi(name);
  pet.increaseAge();
  pet.increaseHunger();
  pet.increaseBoredom();
  pet.increaseSleepiness();
  petElement.width = petElement.width / 8;
  petElement.height = petElement.height / 8;
};

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