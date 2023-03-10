let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage,gameOverImage;
let score = 0;



//๐์ฐ์ฃผ์  ์ขํ
let spaceshipX = canvas.width/2-35;

let spaceshipY = canvas.height-65;


function loadImage (){
  backgroundImage = new Image();
  backgroundImage.src="imgs/background.png"

  spaceshipImage = new Image();
  // spaceshipImage.src = "imgs/buster.png"
  spaceshipImage.src = "imgs/spaceship.png"

  gameOverImage = new Image();
  gameOverImage.src = "imgs/gameover.png"

  enemyImage = new Image();
  enemyImage.src = "imgs/enemy.png"

  bulletImage = new Image();
  bulletImage.src = "imgs/bullet.png"

  fireImage = new Image();
  fireImage.src = "imgs/fire.png"

  pauseImage = new Image();
  pauseImage.src = "imgs/pause.png"

  startImg = new Image();
  startImg.src = "imgs/gamestart.png"
}




let bulletList =[] 
function Bullet () {
    //Bullet์ ๋ง๋ค๊ธฐ ์ํ ์ฌ๋ฃ๋ค์ ๊ฐ๊ณ  ์๋ ํจ์
    this.x = 0;
    this.y = 0; 
    this.init = ()=>{ 
        this.x = spaceshipX + 20; 
        this.y = spaceshipY; 

        bulletList.push(this)

        this.alive= true 
      }
      this.update = ()=>{
        this.y -= 7;
    
    } 
  
  
this.checkhit = function(){

  //์ด์.y <= ์ ๊ตฐ.y and
  //์ด์.x >= ์ ๊ตฐ.x and ์ด์.x <= ์ ๊ตฐ.x + ์ ๊ตฐ์ ๋๋น
  for(let i=0; i<enemyList.length; i++){
      if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40){
          //์ด์์ด ์ฃฝ์ผ๋ฉด ์ ๊ตฐ์ ์ฐ์ฃผ์ ์ด ์์ด์ง๊ณ  ์ ์ํ๋
          score ++;
          this.alive = false //์ฃฝ์ ์ด์!
          enemyList.splice(i, 1);
          //enemyList์์ i๋ฒ์งธ์ ์๋ ๊ฐ 1๊ฐ๋ฅผ ์ฐ์ฃผ์ ๋ง ์๋ผ๋ด๋ฒ๋ฆฌ์

          //๊ฐ์ ์๋ฐ์ดํธํ๋ ๊ฑด ๋ค update()๋ก ๊ฐ์!
  }
  //์ ๊ตฐ์ด ์ฌ๋ฌ๊ฐ(๋ฆฌ์คํธ)๋ผ์ for๋ฌธ ์จ์ค์ผํจ. enemyList ๋ค ๋ถ๋ฌ์!!
}
} }



    function generateRandomValue(min, max){
 
      let randomNum = Math.floor(Math.random() * (max - min + 1)) + min  
  
      return randomNum;
  } 
  
  
  let enemyList = []
  function Enemy(){
      this.x = 0;
      this.y = 0;
      this.init = ()=>{
          this.y = 0 //์ต์๋จ
          this.x = generateRandomValue(0, canvas.width-60);
          enemyList.push(this);
      }

  //์ ๊ตฐ์ด ๋ด๋ ค์๋ผ
  this.update = function(){
      this.y += 3 //์ ๊ตฐ์ ์๋ ์กฐ์ 
  
      if(this.y >= canvas.height - 60){
          gameOver = true;
          console.log('gameover', gameOver)
      }
  }
  }


let keysDown = {}
function setupKeyboardListner() {
    document.addEventListener('keydown',(event)=>{
        keysDown[event.keyCode] = true
      
    });
    document.addEventListener('keyup', (event)=>{
        delete keysDown[event.keyCode]
       
        if(event.keyCode == 32){
            createBullet() 
        }    
    });

}


function createBullet(){
  console.log('์ด์์์ฑ');
  let b = new Bullet();
  b.init() 
}

//์ ๊ตฐ์ด 1์ด๋ง๋ค ์๊ธฐ๊ธฐ
function createEnemy(){
  const interval = setInterval(function() {
      let e = new Enemy();
      e.init();},1000);

}

function update() {
  if(39 in keysDown) {
      spaceshipX += 3
  }
  if (37 in keysDown) {
      spaceshipX -= 3
  }
  if(spaceshipX <= 0){
    spaceshipX = 0
}
if(spaceshipX >= canvas.width - 70){
    spaceshipX = canvas.width -70
}
for(let i=0; i<bulletList.length; i++){
  bulletList[i].update();
  bulletList[i].checkhit();
}
for(let i=0; i<enemyList.length; i++){
  enemyList[i].update();
}

}


function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

  ctx.fillText(`score : ${score}`,20,30);
  ctx.fillStyle = "white";
  ctx.font = "20px arial";
  

  for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){ //์ด์์ด ์ด์์์ผ๋ฉด ๋ณด์ฌ์ค!
        ctx.drawImage(bulletImage, bulletList[i].x,bulletList[i].y); 
    }}
    //์ ๊ตฐ์ ๊ทธ๋ ค์ฃผ์
for(let i=0; i<enemyList.length; i++){
  ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)}

}




function main() {
  update();
  render();
  requestAnimationFrame(main);
}


loadImage();
setupKeyboardListner();
createEnemy();
main()