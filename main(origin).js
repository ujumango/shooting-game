
//๐์บ๋ฒ์ค์ธํ
let canvas;
let ctx;
// ctx : ์ด๋ฏธ์ง ๊ทธ๋ฆฌ๋ ๊ฑธ ๋์์ฃผ๋ ๋ณ์

canvas = document.createElement('canvas');
//canvas๋ผ๋ ๊ฑธ ๋ง๋ค์ด์ ๋ณ์์ ๋ฃ์ด์ค๋ค. 
//๋ณ์๋ ์๋์ด ๊ฐ์ด ์ด๋ค ๊ฐ์ ์ ์ฅํด์ฃผ๋ ๊ณต๊ฐ.

ctx = canvas.getContext('2d');
//ctx๋ ๋ฐฉ๊ธ ๋ง๋  canvas์ conText('2d')๋ผ๋ ๊ฐ์ผ๋ก ๊ฐ์ ธ์ฌ ๊ฒ์ด๋ค.
//์ด ctx๋ฅผ ํตํด 2d ๊ทธ๋ฆผ์ ๊ทธ๋ ค์ค ๊ฒ์ด๋ค.

canvas.width = 400;
canvas.height = 700;
//์ด ์บ๋ฒ์ค์ ๋์ด์ ๋๋น๋ฅผ html์ ๋ฃ์ด์ค์ผ ํจ
document.body.appendChild(canvas);
//appndChild : ์์์ผ๋ก ๋ถ์ฌ์ฃผ๋ผ(์บ๋ฐ์ค๋ฅผ ์์์ผ๋ก ๋ถ์ฌ์ฃผ๋ผ!)

//์ด๋ฏธ์ง ๋ถ๋ฌ์ค๋ ํจ์
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let gameOver = false // true๋ฉด ๊ฒ์์ด ๋๋จ, false์ด๋ฉด ๊ฒ์ ์งํ
let score = 0;
// let pauseGame = false





//๐์ฐ์ฃผ์  ์ขํ
let spaceshipX = canvas.width/2-35;
//์บ๋ฒ์ค ์ค์์ธ 200px์์ ๋นํ๊ธฐ์ ๋ฐ 35px
// 400-35 (ํ์ํ ์ด๋ฏธ์ง๋ค ๋ณ์ ์ค์ )

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
}

let bulletList =[] //๐์ด์๋ค์ ์ ์ฅํ๋ ๋ฆฌ์คํธ(๋ฐฐ์ด)
function Bullet () {
    //Bullet์ ๋ง๋ค๊ธฐ ์ํ ์ฌ๋ฃ๋ค์ ๊ฐ๊ณ  ์๋ ํจ์
    this.x = 0;
    this.y = 0; //์ด๊ธฐ๊ฐ
    //์ด x๋ ์ด Bullet์ด๋ผ๋ function์ ์ํด์๋ ์น๊ตฌ
    //์ด๊ธฐ๊ฐ์ ์๋ฏธ๊ฐ ์์. ์ด์์ด ์ฐ์ฃผ์ ์์๋ถํฐ ์ถ๋ฐํ๋๋ก ์ด์์ ๊ฐ์ ์ํํด์ค์ผ ํจ->initํจ์๋ก ํด์ค๊ฑฐ์ผ.
    this.init = ()=>{ //ํจ์๋ฅผ ์ด๊ธฐํ ํ๋ ํจ์,init์ ์ด๊ธฐํ๋ผ๋ ๋ป
        this.x = spaceshipX + 20; //์ฐ์ฃผ์ ์ X๊ฐ์ผ๋ก ์ด๊ธฐํ , +20์ ์ด์ง ์น์ฐ์ณ์ ๊ทธ๊ฑฐ ๋ณด์ ํด์ฃผ๋ ๊ฐ
        this.y = spaceshipY; //์ฐ์ฃผ์ ์ Y๊ฐ์ผ๋ก ์ด๊ธฐํ (์ฒ์)

        bulletList.push(this) //this์์๋ x,y,init๋ ์์. this๋ผ๋ ๋ฐฉ๊ธ ๋ง๋  ์ด์์ bulletList์ ๋ฃ์ด์ค

        this.alive= true //์ด์์์ false๋ฉด ์ฃฝ์
        //์ด์์ด ์ฃฝ์ผ๋ฉด ์ด๋ป๊ฒ ๋๋์ง..
    };

//์ด์์ด ์์์ง๋ฉด ์ฌ๋ผ๊ฐ
this.update = ()=>{
    this.y -= 7;

}//์ด๊ฑธ updateํจ์ ์์ ๋ฃ์ด์ค์ผ ํจ ๊ณ ๊ณ !

//์ด์์ ๋ฐ์ฌํ  ๋๋ง๋ค ์ฒดํฌ๋ฅผ ํค์ค๊ฑฐ์ผ

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
} 
}




function generateRandomValue(min, max){
    //์ด ํจ์๋ฅผ call์ ํ  ๋ ์ต๋๊ฐ, ์ต์๊ฐ์ ๋ฏธ๋ฆฌ ๋ณด๋ด์ฃผ๋ ๊ฒ
    //์ด ํจ์๋๋๋คํ ์ซ์๋ฅผ ๋ฆฌํด๋ง ํ๋ฉด ๋๋ค.
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min //min๊ฐ์ ์ต์๋ก ๋ณด์ฅ์ด ๋๊ฒ.
    //Math.random : 0~1๊น์ง๋ฅผ ๋ฐํํ๊ฒ ๋จ
    //์ต๋๊ฐ, ์ต์๊ฐ ์ฌ์ด์์ ๋๋ค๊ฐ ๋ฐ๋ ๋ฒ
    //math.floor ์์์  ๋ด๋ฆฌ๊ธฐ!
    //โ์ฌ๊ธฐ๊ฐ ์กฐ๊ธ ํท๊ฐ๋ฆผ...

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
        console.log('gameover', gameOver)
    }
}
}






//๋ฐฉํฅํค ๋๋ฅด๋ฉด ์ด๋ํ๋ ์ด๋ฒคํธ
let keysDown = {}
//์ฐ๋ฆฌ๊ฐ ํด๋ฆญํ ๋ฒํผ์ ๊ฐ์ฒด ์์ ์ ์ฅ
//๋ฒํผ์ด ํด๋ฆญ๋  ๋๋ง๋ค ํด๋ฆญ๋ ๋ฒํผ์ ๊ฐ์ด keyDown์ ์ ์ฅ
function setupKeyboardListner() {
    document.addEventListener('keydown',(event)=>{
        keysDown[event.keyCode] = true
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

//์์ ์ ํ๊ณ  ์๋์ ๋ฐ๋ก function์ ์ฐ๋ ์ด์  : ํ๋์ ํจ์์๋ ํ๋์ ์ญํ ์ ๊ฐ์ง๊ณ  ์์ด์ผ ํจ. (๊ฐ๋์ฑ, ์ฝ๋์ดํด ์ฉ์ด)
//์์ setupkeyboardlistner()์ด ๊ฐ์ง๊ณ  ์๋ ์ญํ ๊ณผ ๋ค๋ฅด๋๊น ๋ฐ๋ก ๋นผ์ค์ ํจ์(ํ์)์ผ๋ก ๋ง๋ค์ด ์ค
function createBullet(){
    console.log('์ด์์์ฑ');
    let b = new Bullet(); //new๋ ์ ์ํ Bullet์ด๋ผ๋ function์ ๋ค์ ํ๋ ์ฐ์ด์ ๋ง๋ค์ด์ค ๊ฑด๋ฐ ๊ทธ๊ฑธ b์ ์ ์ฅํ  ๊ฑฐ์ผ.
    b.init() //์ด์์ ์์ฑํ๊ณ  ๋์ initํจ์๋ฅผ ํธ์ถํ ๊ฑฐ์ผ -> ๊ทธ๋ฌ๋ฉด init์์ ์๋ x๊ฐ, y๊ฐ ์ํํด์ฃผ๊ณ  list์๋ ๋ฃ์ด์ค๊ฑฐ์. ์ด์  ์ด์์ ๊ทธ๋ ค์ฃผ์! render๋ก ๊ฐ์..
}

//์ ๊ตฐ์ด 1์ด๋ง๋ค ์๊ธฐ๊ธฐ
function createEnemy(){
    const interval = setInterval(function() {
        let e = new Enemy();
        e.init();
    },1000);

    //setInterval(ํธ์ถํ๊ณ ์ถ์ํจ์, ์๊ฐ:์ผ๋ง๋ง๋ค ํธ์ถ?)์ ๋ด๊ฐ ์ํ๋ ์๊ฐ๋ง๋ค ํจ์ํธ์ถ 
}

//์ฐ์ฃผ์  X,y ๊ฐ ์๋ฐ์ดํธํด์ ์ด๋
function update() {
    if(39 in keysDown) {
        spaceshipX += 3 //์ฐ์ฃผ์ ์ ์๋
    }// right
    if (37 in keysDown) {
        spaceshipX -= 3
    }// left

 //์ฐ์ฃผ์ ์ ์ขํ๊ฐ์ด ๋ฌดํ๋๋ก ์๋ฐ์ดํธ ๋์ง ์๊ณ  ๊ฒฝ๊ธฐ์ฅ ์์์๋ง ์์ง์ผ ์ ์๊ฒ ํ๋ ค๋ฉด?
//x์ขํ ์ต์๊ฐ :0, ์ต๋๊ฐ: 130(์บ๋ฒ์ค์ ๋๋น-์ฐ์ฃผ์  ํฌ๊ธฐ)
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
//bullstList์์ ๋ค์ด๊ฐ ์ด์๋ค์ ๊ณ์ updateํจ์๋ฅผ ํธ์ถํด์ค๊ฑฐ์! ๊ทธ๋์ ๋ฐ๋ณตํด์ -7 ํด์ค ๊ฑฐ์ 
//์ด์์ด ๋ ์๊ฐ ๋๋ง๋ค ๋งค๋ฒ ์ ๊ตฐ์ ์ณค๋์ง ์ ์ณค๋์ง ์ฒดํฌ
}

for(let i=0; i<enemyList.length; i++){
    enemyList[i].update();
}
}




//์ด๋ฏธ์ง ๋ณด์ฌ์ฃผ๋ ํจ์
//render : ๊ทธ๋ฆฌ๋ค, draw์ ๊ฐ๋. ui๋ฅผ ๊ทธ๋ ค์ฃผ๋ ๊ฒ
function render() {
//๊ทธ๋ฆผ์ ๊ทธ๋ ค์ฃผ๋ ctx(canvas์ context๋ฅผ ํ๊ณ  ์์)๊ฐ ์ต์ข์ ์ผ๋ก ๊ทธ๋ฆผ์ ๊ทธ๋ ค์ฃผ๋ ์ญํ ์ ํจ. ๊ทธ๋์ ctx์์ draw๋ฅผ ํด์ผ ํจ!
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
        // ctx.drawImage(fireImage, bulletList[i].x,bulletList[i].y)
    }
   
}

//์ ๊ตฐ์ ๊ทธ๋ ค์ฃผ์
for(let i=0; i<enemyList.length; i++){
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    
  
}
}





function main() {

    if(!gameOver){ //!gameOver = false ์ํ๋ฅผ ๋งํจ, true๋ฉด ๊ทธ๋ง ๋์๋ผ
    //render๋ฅผ ๋ฏธ์น๋ฏ์ด ํธ์ถํ  ๊ฑฐ์!
    update(); //์ขํ๊ฐ์ ์๋ฐ์ดํธํ๊ณ (๊ทธ๋์ main ์์ ๋ฃ์)
    render(); //๊ทธ๋ ค์ฃผ๋ 
    requestAnimationFrame(main) //์ ๋๊ฐ๋ฅผ ๊ณ์ ๋ฐ๋ณตํด์ฃผ๋ ๊ฒ
    //์ ๋๋ฉ์ด์์ฒ๋ผ ํ๋ ์์ ๊ณ์ ํธ์ถํด์ ๋ณด์ฌ์ฃผ๋ ํจ์
    //main์ ์๋์ํค๋ฉด ๋์์์ด ๋ฉ์ธ์ ๋ถ๋ฅด๊ฒ ๋จ!
}else{
    ctx.drawImage(gameOverImage,20,130,350,380)
}
}




// function pause() {
//     document.addEventListener('keydown', function(event){
//         console.log('์ ๋ฆฌํด๋ผ',keysDown)
        
//         if(event.keyCode == 27){
          
//         }else if(gamePause == true){

//         }
//     })
// }






//๋ง๋ค์ด์ค ํจ์ ๋ถ๋ฌ์ฃผ๋ผ
loadImage();
setupKeyboardListner();
createEnemy();
main();


//๋ ๋ ํจ์๋ฅผ ๊ณ~์ ๋ถ๋ฌ์์ ๋ฐฐ๊ฒฝ ์ด๋ฏธ์ง๋ฅผ ํ ๋ฒ์ด ์๋๋ผ ๊ณ~์ ๋ถ๋ฌ์ค๋๋ก ํจ์๋ฅผ ์ถ๊ฐํด์ผ ํจ.




//๐์ด์๋ง๋ค๊ธฐ
//1. ์คํ์ด์ค ๋ฐ๋ฅผ ๋๋ฅด๋ฉด ์ด์์ ๋ฐ์ฌํ๋ค.
//2. ์ด์์ด ๋ฐ์ฌ : Y๊ฐ์ด ์ค์ด๋ ๋ค. X๊ฐ์ ? ์ด์์ ๋๋ฅด๋ ์๊ฐ์ X๊ฐ
//3. ๋ฐ์ฌ๋ ์ด์๋ค์ ์ด์ ๋ฐฐ์ด์ ์ ์ฅ์ ํ๋ค.
//4. ๋ชจ๋  ์ด์๋ค์ x,y ์ข์ตธ ๊ฐ์ด ์์ด์ผ ํ๋ค.
//5. ์ด์ ๋ฐฐ์ด๋ค์ ๊ฐ์ง๊ณ  render๋ก ๊ทธ๋ ค์ค๋ค.
// ->์์ keyboardlistner๋ก ์ด๋ํด์ ๋ง๋ค์!


//๐์ ๊ตฐ์ ํน์ง
//1. ๊ท์ฝ๋ค  x, y, init, update 
//2. ์ ๊ตฐ์ ์์น๊ฐ ๋๋คํ๋ค.
//3. ์ ๊ตฐ์ ๋ฐ์ผ๋ก ๋ด๋ ค์จ๋ค.
//4. ์ ๊ตฐ์ 1์ด๋ง๋ค ํ๋์ฉ ์๊ธด๋ค.
//5. ์ ๊ตฐ์ด ๋ฐ๋ฅ์ ๋ฟ์ผ๋ฉด ๊ฒ์ ์ค๋ฒ
//6. ์ ๊ตฐ๊ณผ ์ด์์ด ๋ง๋๋ฉด ์ฐ์ฃผ์ ์ด ์ฌ๋ผ์ง๋ค. ์ ์ 1์  ํ๋