let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage,gameOverImage;
let score = 0;



//📌우주선 좌표
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
    //Bullet을 만들기 위한 재료들을 갖고 있는 함수
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

  //총알.y <= 적군.y and
  //총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 너비
  for(let i=0; i<enemyList.length; i++){
      if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40){
          //총알이 죽으면 적군의 우주선이 없어지고 점수획득
          score ++;
          this.alive = false //죽은 총알!
          enemyList.splice(i, 1);
          //enemyList에서 i번째에 있는 값 1개를 우주선만 잘라내버리자

          //값을 업데이트하는 건 다 update()로 가자!
  }
  //적군이 여러개(리스트)라서 for문 써줘야함. enemyList 다 불러와!!
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
          this.y = 0 //최상단
          this.x = generateRandomValue(0, canvas.width-60);
          enemyList.push(this);
      }

  //적군이 내려와라
  this.update = function(){
      this.y += 3 //적군의 속도 조절
  
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
  console.log('총알생성');
  let b = new Bullet();
  b.init() 
}

//적군이 1초마다 생기기
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
    if(bulletList[i].alive){ //총알이 살아있으면 보여줘!
        ctx.drawImage(bulletImage, bulletList[i].x,bulletList[i].y); 
    }}
    //적군을 그려주자
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