
//๐์บ๋ฒ์ค์ธํ
let canvas;
let ctx;
// ctx : ์ด๋ฏธ์ง ๊ทธ๋ฆฌ๋ ๊ฑธ ๋์์ฃผ๋ ๋ณ์

canvas = document.createElement('canvas');


ctx = canvas.getContext('2d');


canvas.width = 400;
canvas.height = 700;
//์ด ์บ๋ฒ์ค์ ๋์ด์ ๋๋น๋ฅผ html์ ๋ฃ์ด์ค์ผ ํจ
document.body.appendChild(canvas);
//appndChild : ์์์ผ๋ก ๋ถ์ฌ์ฃผ๋ผ(์บ๋ฐ์ค๋ฅผ ์์์ผ๋ก ๋ถ์ฌ์ฃผ๋ผ!)

//์ด๋ฏธ์ง ๋ถ๋ฌ์ค๋ ํจ์
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let score = 0;
let gameV = false //test
let gameStatus = 'A' //๊ฒ์ ์คํ





//๐์ฐ์ฃผ์  ์ขํ
let spaceshipX = canvas.width/2-35;

let spaceshipY = canvas.height-65;
// 700 - 65 (๋์ด-๋นํ๊ธฐ๋์ด)

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

let bulletList =[] //๐์ด์๋ค์ ์ ์ฅํ๋ ๋ฆฌ์คํธ(๋ฐฐ์ด)
function Bullet () {
    //Bullet์ ๋ง๋ค๊ธฐ ์ํ ์ฌ๋ฃ๋ค์ ๊ฐ๊ณ  ์๋ ํจ์
    this.x = 0;
    this.y = 0; //์ด๊ธฐ๊ฐ
    this.init = ()=>{ 
        this.x = spaceshipX + 20; //์ฐ์ฃผ์ ์ X๊ฐ์ผ๋ก ์ด๊ธฐํ , +20์ ์ด์ง ์น์ฐ์ณ์ ๊ทธ๊ฑฐ ๋ณด์ ํด์ฃผ๋ ๊ฐ
        this.y = spaceshipY; //์ฐ์ฃผ์ ์ Y๊ฐ์ผ๋ก ์ด๊ธฐํ (์ฒ์)

        bulletList.push(this) 

        this.alive= true //์ด์์์ false๋ฉด ์ฃฝ์
   
    };

//์ด์์ด ์์์ง๋ฉด ์ฌ๋ผ๊ฐ
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
      
    }
   
}
} 
}




function generateRandomValue(min, max){

    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min //min๊ฐ์ ์ต์๋ก ๋ณด์ฅ์ด ๋๊ฒ.
 

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
        //this๋ ๋ฐฉ๊ธ ๋ง๋  ์ ๊ตฐ(x๊ฐ, y๊ฐ)
    }
//์ ๊ตฐ์ด ๋ด๋ ค์๋ผ
this.update = function(){
    this.y += 3 //์ ๊ตฐ์ ์๋ ์กฐ์ 

    if(this.y >= canvas.height - 60){
        gameOver = true;
        gameStatus = 'Q';
        // console.log('gameover')
        console.log('game status  = Q')
    }
}
}






//๋ฐฉํฅํค ๋๋ฅด๋ฉด ์ด๋ํ๋ ์ด๋ฒคํธ
let keysDown = {}

//๋ฒํผ์ด ํด๋ฆญ๋  ๋๋ง๋ค ํด๋ฆญ๋ ๋ฒํผ์ ๊ฐ์ด keyDown์ ์ ์ฅ
function setupKeyboardListner() {
    document.addEventListener('keydown',(event)=>{
        keysDown[event.keyCode] = true
        console.log('์ง๊ธ ๋๋ฅธ ๋ฒํผ์', keysDown)
        //๋๋ฅธ ์ํ์๋ ๋ฒํผ ๊ฐ ์ ์ฅ, ํค๊ฐ ๋ผ์ง๋ฉด ๋ฒํผ ๊ฐ์ด ์ฌ๋ผ์ ธ์ผ ํจ.
    });
    document.addEventListener('keyup', (event)=>{
        delete keysDown[event.keyCode]
        //์คํ์ด์ค๋ฐ๊ฐ ์ฌ๋ผ์ฌ ๋ ์ด์์ ๋ฐ์ฌํ  ๊ฑฐ์
        if(event.keyCode == 32){
            createBullet() //์ด์ ์์ฑํ๋ ํจ์
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
        e.init();
    },1000);

  
}

//์ฐ์ฃผ์  X,y ๊ฐ ์๋ฐ์ดํธํด์ ์ด๋
function update() {
    if(39 in keysDown) {
        spaceshipX += 3 //์ฐ์ฃผ์ ์ ์๋
    }// right
    if (37 in keysDown) {
        spaceshipX -= 3
    }// left


if(spaceshipX <= 0){
    spaceshipX = 0
}
if(spaceshipX >= canvas.width - 70){
    spaceshipX = canvas.width -70
}

//์ด์์ y์ขํ๋ฅผ ์๋ฐ์ดํธ ํด์ฃผ๋ ํจ์ ํธ์ถํ๋ฉด์ ์ ์์ฒดํฌ
for(let i=0; i<bulletList.length; i++){
    bulletList[i].update();
    bulletList[i].checkhit();
}

for(let i=0; i<enemyList.length; i++){
    enemyList[i].update();
}
}




//์ด๋ฏธ์ง ๋ณด์ฌ์ฃผ๋ ํจ์
//render : ๊ทธ๋ฆฌ๋ค, draw์ ๊ฐ๋. ui๋ฅผ ๊ทธ๋ ค์ฃผ๋ ๊ฒ
function render() {
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//canvas์ ๋๋น์ ๋์ด๋งํผ
ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

ctx.fillText(`score : ${score}`,20,30);
ctx.fillStyle = "white";
ctx.font = "20px arial";

//์ด์์ ๊ทธ๋ ค์ฃผ์
for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){ //์ด์์ด ์ด์์์ผ๋ฉด ๋ณด์ฌ์ค!
        ctx.drawImage(bulletImage, bulletList[i].x,bulletList[i].y); //bulletList์ i๋ฒ์งธ์ ์๋ ์ ์ x๊ฐ, y๊ฐ
    }else{
      
    }
   
}

//์ ๊ตฐ์ ๊ทธ๋ ค์ฃผ์
for(let i=0; i<enemyList.length; i++){
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
}
}



function main() {

if(gameStatus == 'A'){ 
//    ctx.drawImage(startImg,50,280,300,100);
   gameV = false;
   update();
   render();
   requestAnimationFrame(main); 
   console.log('ใใฃ๊ฑฐ ์์์ด์ผ')
   
}else if(gameStatus == 'Q'){
    console.log('๊ฒ์๋ฉ์ถฐ!!')
    ctx.drawImage(gameOverImage,20,130,350,380)
    
}else if(gameStatus == 'P'){
    gameV = true;
    console.log('P๊ฐ ๋๋ฉด์ฉ')
    ctx.drawImage(pauseImage,50,280,300,100)
}
}

function pause() {
    document.addEventListener('keydown', function(event){
        
        if(event.keyCode == 27){
            gameStatus = 'P'
            console.log('ESCํด๋ฆญ')
        //   ctx.drawImage(pauseImage,50,280,300,100)
        }else if(event.keyCode == 13){
            console.log('ENTERํด๋ฆญ')
            gameStatus = 'A'
            main();
        }
    })
}

function start() {
    setInterval(main(), 1000)
}



//๋ง๋ค์ด์ค ํจ์ ๋ถ๋ฌ์ฃผ๋ผ
loadImage();
setupKeyboardListner();
createEnemy();
start() ;
pause();


//๋ ๋ ํจ์๋ฅผ ๊ณ~์ ๋ถ๋ฌ์์ ๋ฐฐ๊ฒฝ ์ด๋ฏธ์ง๋ฅผ ํ ๋ฒ์ด ์๋๋ผ ๊ณ~์ ๋ถ๋ฌ์ค๋๋ก ํจ์๋ฅผ ์ถ๊ฐํด์ผ ํจ.



