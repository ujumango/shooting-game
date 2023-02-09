
//📌캔버스세팅
let canvas;
let ctx;
// ctx : 이미지 그리는 걸 도와주는 변수

canvas = document.createElement('canvas');


ctx = canvas.getContext('2d');


canvas.width = 400;
canvas.height = 700;
//이 캔버스의 높이와 너비를 html에 넣어줘야 함
document.body.appendChild(canvas);
//appndChild : 자식으로 붙여주라(캔바스를 자식으로 붙여주라!)

//이미지 불러오는 함수
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let score = 0;
let gameV = false //test
let gameStatus = 'A' //게임 실행





//📌우주선 좌표
let spaceshipX = canvas.width/2-35;

let spaceshipY = canvas.height-65;
// 700 - 65 (높이-비행기높이)

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

let bulletList =[] //📌총알들을 저장하는 리스트(배열)
function Bullet () {
    //Bullet을 만들기 위한 재료들을 갖고 있는 함수
    this.x = 0;
    this.y = 0; //초기값
    this.init = ()=>{ 
        this.x = spaceshipX + 20; //우주선의 X값으로 초기화 , +20은 살짝 치우쳐서 그거 보정해주는 값
        this.y = spaceshipY; //우주선의 Y값으로 초기화 (처음)

        bulletList.push(this) 

        this.alive= true //살아있음 false면 죽음
   
    };

//총알이 쏘아지면 올라감
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
      
    }
   
}
} 
}




function generateRandomValue(min, max){

    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min //min값은 최소로 보장이 되게.
 

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
        //this는 방금 만든 적군(x값, y값)
    }
//적군이 내려와라
this.update = function(){
    this.y += 3 //적군의 속도 조절

    if(this.y >= canvas.height - 60){
        gameOver = true;
        gameStatus = 'Q';
        // console.log('gameover')
        console.log('game status  = Q')
    }
}
}






//방향키 누르면 이동하는 이벤트
let keysDown = {}

//버튼이 클릭될 때마다 클릭된 버튼의 값이 keyDown에 저장
function setupKeyboardListner() {
    document.addEventListener('keydown',(event)=>{
        keysDown[event.keyCode] = true
        console.log('지금 누른 버튼은', keysDown)
        //누른 상태에는 버튼 값 저장, 키가 떼지면 버튼 값이 사라져야 함.
    });
    document.addEventListener('keyup', (event)=>{
        delete keysDown[event.keyCode]
        //스페이스바가 올라올 때 총알을 발사할 거임
        if(event.keyCode == 32){
            createBullet() //총알 생성하는 함수
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
        e.init();
    },1000);

  
}

//우주선 X,y 값 업데이트해서 이동
function update() {
    if(39 in keysDown) {
        spaceshipX += 3 //우주선의 속도
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

//총알의 y좌표를 업데이트 해주는 함수 호출하면서 점수체크
for(let i=0; i<bulletList.length; i++){
    bulletList[i].update();
    bulletList[i].checkhit();
}

for(let i=0; i<enemyList.length; i++){
    enemyList[i].update();
}
}




//이미지 보여주는 함수
//render : 그리다, draw의 개념. ui를 그려주는 것
function render() {
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//canvas의 너비와 높이만큼
ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

ctx.fillText(`score : ${score}`,20,30);
ctx.fillStyle = "white";
ctx.font = "20px arial";

//총알을 그려주자
for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){ //총알이 살아있으면 보여줘!
        ctx.drawImage(bulletImage, bulletList[i].x,bulletList[i].y); //bulletList의 i번째에 있는 애의 x값, y값
    }else{
      
    }
   
}

//적군을 그려주자
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
   console.log('ㅇㅣ거 시작이야')
   
}else if(gameStatus == 'Q'){
    console.log('게임멈춰!!')
    ctx.drawImage(gameOverImage,20,130,350,380)
    
}else if(gameStatus == 'P'){
    gameV = true;
    console.log('P가 되면용')
    ctx.drawImage(pauseImage,50,280,300,100)
}
}

function pause() {
    document.addEventListener('keydown', function(event){
        
        if(event.keyCode == 27){
            gameStatus = 'P'
            console.log('ESC클릭')
        //   ctx.drawImage(pauseImage,50,280,300,100)
        }else if(event.keyCode == 13){
            console.log('ENTER클릭')
            gameStatus = 'A'
            main();
        }
    })
}

function start() {
    setInterval(main(), 1000)
}



//만들어준 함수 불러주라
loadImage();
setupKeyboardListner();
createEnemy();
start() ;
pause();


//렌더 함수를 계~속 불러와서 배경 이미지를 한 번이 아니라 계~속 불러오도록 함수를 추가해야 함.



