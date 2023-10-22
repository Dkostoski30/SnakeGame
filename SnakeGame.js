function displayKeys(){
    let x = document.getElementById("InitialControls");
    x.id="ControlsContainer";
}
class Apple{
    constructor(pos) {
        this.pos=pos;
    }
    generate(){
        let gridElements = document.querySelectorAll(".gridElement");
        let computedStyle = window.getComputedStyle(gridElements[this.pos]);
        //if(computedStyle.getPropertyValue("backgroundColor") === "rgb(62, 78, 98).")
            gridElements[this.pos].style.backgroundColor = "darkgoldenrod";
    }
    generateRandom(y){
        let gridElements = document.querySelectorAll(".gridElement");
        let computedStyle = window.getComputedStyle(gridElements[y]);
        if(computedStyle.getPropertyValue("background-color")==="rgb(62, 78, 98)") {
            this.pos = y;
            gridElements[this.pos].style.backgroundColor = "darkgoldenrod";
            return 0;
        }else {
            this.generateRandom(Math.floor(Math.random() * (Nivo.gridElements.length)));
        }
    }
}
class Zmija{
    constructor(glava, telo) {
        this.glava=glava;
        this.telo=telo;
        this.orientacija=1;         //0 - dolu; 1 - desno; 2 - gore; 3 - levo
    }
     generate(){
        let gridElements = document.querySelectorAll(".gridElement");
        for (let i = 0; i < this.telo.length; i++) {
            gridElements[this.telo[i]].style.backgroundColor = "green";
        }
        gridElements[this.glava].style.backgroundColor = "red";
    }
    deleteLast(){
        let gridElements = document.querySelectorAll(".gridElement");
        gridElements[this.telo[0]].style.backgroundColor = "#3e4e62";
        for (let i = 0; i < this.telo.length-1; i++) {
            this.telo[i]=this.telo[i+1];
        }
    }
    naLevoDvizenje(){
        this.deleteLast();
        this.telo[this.telo.length-1]=this.glava;
        this.glava++;
        this.generate();
    }
    naDesnoDvizenje(){
        this.deleteLast();
        this.telo[this.telo.length-1]=this.glava;
        this.glava--;
        this.generate();
    }
    naDoluDvizenje(){
        this.deleteLast();
        this.telo[this.telo.length-1]=this.glava;
        this.glava=this.glava+8;
        this.generate();
    }
    naGoreDvizenje(){
        this.deleteLast();
        this.telo[this.telo.length-1]=this.glava;
        this.glava=this.glava-8;
        this.generate();
    }
    dvizi(){
        if(this.orientacija===0){
            this.naDoluDvizenje();
        }else if(this.orientacija===1){
            this.naLevoDvizenje();
        }else if(this.orientacija===2){
            this.naGoreDvizenje();
        }else{
            this.naDesnoDvizenje();
        }
    }
    hasColided(){
        if(this.orientacija===0 && (this.glava > 55 && this.glava < 64)){
            return true;
        }else if(this.orientacija===2 && (this.glava < 8)){
            return true;
        }else if(this.orientacija===1 && ((this.glava+1)%8===0)){
            return true;
        }else if(this.orientacija===3 &&(this.glava%8===0)){
            return true;
        }
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function countdown(){
    let x=document.getElementById('Timer');


        x.innerHTML = "3";


        await delay(1500);
        x.innerHTML = "2";


        await delay(1500);
        x.innerHTML = "1";

        await delay(1100);

        x.innerHTML = "START!";
        await delay(1000);
        x.innerHTML = '';
}
class Nivo {
    static generateTiles(){
        Nivo.gridElements = document.querySelectorAll(".gridElement");
        for (let i = 0; i < Nivo.gridElements.length; i++) {
            Nivo.gridElements[i].style.backgroundColor = "#3e4e62";
        }
    }
     static generateEntities(){
        Nivo.gridElements = document.querySelectorAll(".gridElement");
        const randomIndex = Math.floor(Math.random() * (Nivo.gridElements.length-4))+4;
        this.apple = new Apple(randomIndex);
        this.snake = new Zmija(6, [0, 1, 2, 3, 4, 5]);
        this.generateTiles();
        this.apple.generate();
        this.snake.generate();
        let startButton=document.getElementById('Dugme');
         startButton.style.display = "none";
         displayKeys();
         countdown().then(resolve => this.startGame());
    }
    static clearField(){

    }
    static gameOver(score){
         let displayScore = document.getElementById('Score');
         displayScore.style.display = 'flex';
         let y = document.getElementById('ScoreNUM');
         y.innerHTML = score;
         let x = document.getElementById('Timer');
         x.style.display = 'none'
    }
    static async startGame() {
        //let arrows = document.querySelectorAll('.ArrowContainer');
        let UpArrow = document.getElementById('UpArrow');
        UpArrow.addEventListener("click",()=>{
            this.snake.orientacija=2;
        })
        let DownArrow = document.getElementById('DownArrow');
        DownArrow.addEventListener("click",()=>{
            this.snake.orientacija=0;
        })
        let LeftArrow = document.getElementById('LeftArrow');
        LeftArrow.addEventListener("click",()=>{
            this.snake.orientacija=3;
        })
        let RightArrow = document.getElementById('RightArrow');
        RightArrow.addEventListener("click",()=>{
            this.snake.orientacija=1;
        })
        let x = 0;
        while (1) {
            this.snake.dvizi();
            await delay(200);
            if(this.snake.hasColided()){
                this.gameOver(x);
                break;
            }if(this.snake.glava===this.apple.pos) {
                x++;
                let y = Math.floor(Math.random() * (Nivo.gridElements.length));
                this.apple.generateRandom(y);
            }
        }
    }
}

