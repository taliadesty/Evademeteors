//Mengatur Posisi Awal 
let screen = 0;
var hero, level, peta;
var kecepatan = 5;
var score = 0;
var posx = 10, posy = 200;

//Fungsi Setup
function setup() {
  hero = new Hero(10, 200, 20, 20);
  level = new Level(1, 1, 5);
  peta = new Map(600, 600);
  peta.init();
}

function draw() {
  if(screen === 0){
    background('#000000');
    fill('#FFFFFF')
    textSize(20)
    text('Click to Start the game!', (width/2) - 100, height/2 );
    text('Talia Desty Maharani - 2117051017', (width/2) - 150, height/2 + 20);
    text('Kristi Ayuni - 2117051097', (width/2) - 110, height/2 + 40);

  
  }else if(screen === 1){
    background('#000000');
    fill('#ffffff');
    text(`Score: ${score}`, 500, 20)
    text(`Level: ${level.getCurentLevel()}`, 500, 30)
    hero.display();

    for(var mon of peta.monster){
        mon.display();

        if(dist(mon.x, mon.y, hero.x, hero.y) < 20){
            peta.monster.splice(peta.monster.indexOf(mon), 1);
         
            if(mon.color === 1){
                hero.increaseScore();
                
                if(score % 10 == 0){
                    level.increaselevel(); 
                    kecepatan += 5;
                }
                level.checkLevel();
            }else{ 
                screen = 2;
                
            }
        }
    }

    for(var mon of peta.monster){
     
      if(mon.x < 0){
        peta.monster.splice(peta.monster.indexOf(mon), 1); 
        var posY = random(0, 600);
        var posX = random(2000, 600);
        mon = new Monster(posX, posY, 10, 10);
        peta.monster.push(mon)
      }
    }
  }
  class Level{ // Class Level
  constructor(currentLevel, latestLevel, maxLevel) {
    this.currentLevel = currentLevel;
    this.latestLevel = latestLevel;
    this.maxLevel = maxLevel;
  }
  setLevel(level){
    this.currentLevel = level;
  }

  getCurentLevel(){
    return this.currentLevel;
  }

  setLatestLevel(level){
    this.latestLevel = level;
  }

  getlatesttLevel(){
    return this.latestLevel;
  }
  increaselevel(){
    this.currentLevel++;
  }

  checkLevel(){ // Jika level lebih dari 5, akan diubah menjadi tetap 5
    if(this.currentLevel > this.maxLevel){
        this.currentLevel = 5;
    }
  }
}
