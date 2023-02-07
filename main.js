
//📌캔버스세팅
let canvas;
let ctx;
// ctx : 이미지 그리는 걸 도와주는 변수

canvas = document.createElement('canvas');
//canvas라는 걸 만들어서 변수에 넣어준다. 
//변수는 양동이 같이 어떤 값을 저장해주는 공간.

ctx = canvas.getContext('2d');
//ctx는 방금 만든 canvas에 conText('2d')라는 값으로 가져올 것이다.
//이 ctx를 통해 2d 그림을 그려줄 것이다.

canvas.width = 400;
canvas.height = 700;
//이 캔버스의 높이와 너비를 html에 넣어줘야 함
document.body.appendChild(canvas);
//appndChild : 자식으로 붙여주라(캔바스를 자식으로 붙여주라!)

//이미지 불러오는 함수
let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let gameOver = false // true면 게임이 끝남, false이면 게임 진행
let score = 0;
let pauseGame = false





//📌우주선 좌표
let spaceshipX = canvas.width/2-35;
//캔버스 중앙인 200px에서 비행기의 반 35px
// 400-35 (필요한 이미지들 변수 설정)

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
}

let bulletList =[] //📌총알들을 저장하는 리스트(배열)
function Bullet () {
    //Bullet을 만들기 위한 재료들을 갖고 있는 함수
    this.x = 0;
    this.y = 0; //초기값
    //이 x는 이 Bullet이라는 function에 속해있는 친구
    //초기값은 의미가 없음. 총알이 우주선에서부터 출발하도록 총알의 값을 셋팅해줘야 함->init함수로 해줄거야.
    this.init = ()=>{ //함수를 초기화 하는 함수,init은 초기화라는 뜻
        this.x = spaceshipX + 20; //우주선의 X값으로 초기화 , +20은 살짝 치우쳐서 그거 보정해주는 값
        this.y = spaceshipY; //우주선의 Y값으로 초기화 (처음)

        bulletList.push(this) //this안에는 x,y,init도 있음. this라는 방금 만든 총알을 bulletList에 넣어줌

        this.alive= true //살아있음 false면 죽음
        //총알이 죽으면 어떻게 되는지..
    };

//총알이 쏘아지면 올라감
this.update = ()=>{
    this.y -= 7;

}//이걸 update함수 안에 넣어줘야 함 고고!

//총알을 발사할 때마다 체크를 헤줄거야

this.checkhit = function(){

    //총알.y <= 적군.y and
    //총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 너비
    for(let i=0; i<enemyList.length; i++){
        if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 55){
            //총알이 죽으면 적군의 우주선이 없어지고 점수획득
            score++;
            this.alive = false //죽은 총알!
            enemyList.splice(i, 1);
            //enemyList에서 i번째에 있는 값 1개를 우주선만 잘라내버리자

            //값을 업데이트하는 건 다 update()로 가자!
    }
    //적군이 여러개(리스트)라서 for문 써줘야함. enemyList 다 불러와!!
}
} 
}




function generateRandomValue(min,max){
    //이 함수를 call을 할 때 최대값, 최소값을 미리 보내주는 것
    //이 함수는랜덤한 숫자를 리턴만 하면 된다.
    let randomNum = Math.floor(Math.random() * (max-min+1))+min //min값은 최소로 보장이 되게.
    //Math.random : 0~1까지를 반환하게 됨
    //최대값, 최소값 사이에서 랜덤값 받는 법
    //math.floor 소수점 내리기!
    //❔여기가 조금 헷갈림...

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
    this.y += 2 //적군의 속도 조절

    if(this.y >= canvas.height - 60){
        gameOver = true;
        console.log('gameover')
    }
}
}






//방향키 누르면 이동하는 이벤트
let keysDown = {}
//우리가 클릭한 버튼을 객체 안에 저장
//버튼이 클릭될 때마다 클릭된 버튼의 값이 keyDown에 저장
function setupKeyboardListner() {
    document.addEventListener('keydown',(event)=>{
        keysDown[event.keyCode] = true
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

//위에 안 하고 아래에 따로 function을 쓰는 이유 : 하나의 함수에는 하나의 역할을 가지고 있어야 함. (가독성, 코드이해 용이)
//위에 setupkeyboardlistner()이 가지고 있는 역할과 다르니까 따로 빼줘서 함수(펑션)으로 만들어 줌
function createBullet(){
    console.log('총알생성');
    let b = new Bullet(); //new는 정의한 Bullet이라는 function을 다시 하나 찍어서 만들어줄 건데 그걸 b에 저장할 거야.
    b.init() //총알을 생성하고 나서 init함수를 호출할거야 -> 그러면 init안에 있는 x값, y값 셋팅해주고 list에도 넣어줄거임. 이제 총알을 그려주자! render로 가자..
}

//적군이 1초마다 생기기
function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000)
    //setInterval(호출하고싶은함수, 시간:얼마마다 호출?)은 내가 원하는 시간마다 함수호출 
}

//우주선 X,y 값 업데이트해서 이동
function update() {
    if(39 in keysDown) {
        spaceshipX += 3 //우주선의 속도
    }// right
    if (37 in keysDown) {
        spaceshipX -= 3
    }// left

 //우주선의 좌표값이 무한대로 없데이트 되지 않고 경기장 안에서만 움직일 수 있게 하려면?
//x좌표 최소값 :0, 최대값: 130(캔버스의 너비-우주선 크기)
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
//bullstList안에 들어간 총알들은 계속 update함수를 호출해줄거임! 그래서 반복해서 -7 해줄 거임 
//총알이 날아갈 때마다 매번 적군을 쳤는지 안 쳤는지 체크
}

for(let i=0; i<enemyList.length; i++){
    enemyList[i].update();
}
}




//이미지 보여주는 함수
//render : 그리다, draw의 개념. ui를 그려주는 것
function render() {
//그림을 그려주는 ctx(canvas의 context를 품고 있음)가 최종적으로 그림을 그려주는 역할을 함. 그래서 ctx에서 draw를 해야 함!
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//canvas의 너비와 높이만큼
ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

ctx.fillText(`score : ${score}`,20,30);
ctx.fillStyle = "white";
ctx.font = "20px arial"

//총알을 그려주자
for(let i=0; i<bulletList.length; i++){
    if(bulletList[i].alive){ //총알이 살아있으면 보여줘!
        ctx.drawImage(bulletImage, bulletList[i].x,bulletList[i].y); //bulletList의 i번째에 있는 애의 x값, y값
    }else{
        // ctx.drawImage(fireImage, bulletList[i].x,bulletList[i].y)
    }
   
}

//적군을 그려주자
for(let i=0; i<enemyList.length; i++){
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    
  
}
}





function main() {

    if(!gameOver){ //!gameOver = false 상태를 말함, true면 그만 나와라
    //render를 미친듯이 호출할 거임!
    update(); //좌표값을 업데이트하고(그래서 main 안에 넣음)
    render(); //그려주는 
    requestAnimationFrame(main) //위 두개를 계속 반복해주는 것
    //애니메이션처럼 프레임을 계속 호출해서 보여주는 함수
    //main을 작동시키면 끊임없이 메인을 부르게 됨!
}else{
    ctx.drawImage(gameOverImage,20,130,350,380)
}
}




// function pause() {
//     document.addEventListener('keydown', function(event){
//         console.log('정리해라',keysDown)
        
//         if(event.keyCode == 27){
          
//         }else if(gamePause == true){

//         }
//     })
// }






//만들어준 함수 불러주라
loadImage();
setupKeyboardListner();
createEnemy();
main();


//렌더 함수를 계~속 불러와서 배경 이미지를 한 번이 아니라 계~속 불러오도록 함수를 추가해야 함.




//📌총알만들기
//1. 스페이스 바를 누르면 총알을 발사한다.
//2. 총알이 발사 : Y값이 줄어든다. X값은 ? 총알을 누르는 순간의 X값
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 모든 총알들은 x,y 좌쵸 값이 있어야 한다.
//5. 총알 배열들을 가지고 render로 그려준다.
// ->위에 keyboardlistner로 이동해서 만들자!


//📌적군의 특징
//1. 귀엽다  x, y, init, update 
//2. 적군의 위치가 랜덤하다.
//3. 적군은 밑으로 내려온다.
//4. 적군은 1초마다 하나씩 생긴다.
//5. 적군이 바닥에 닿으면 게임 오버
//6. 적군과 총알이 만나면 우주선이 사라진다. 점수 1점 획득