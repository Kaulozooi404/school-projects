let animals = ["Goudvis", "Zalm", "Clownvis", "Haai", "Tonijn", "Adelaar", "Papegaai", "Mees", "Kolibrie", "Uil", "Leeuw", "Olifant", "Walvis", "Vleermuis", "Giraffe", "Bij", "Vlinder", "Mier", "Libelle", "Kever"];

function setup() {
  createCanvas(1000, 1000);
  textSize(24); 
}

function draw() {
  background(220);
  for (let i = 0; i < animals.length; i++) {
    let x = 200;      
    let y = 50 + (i * 30); 
    text(animals[i], x, y); 
  }
}
