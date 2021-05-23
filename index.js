const id_body = "body-id";
const id_start = "start";
const id_cover = "cover";
const id_first = "first";
const id_second = "second";
const id_third = "third";
const id_container = "container";
const id_field = "field";
const id_road = "road";
const id_button_container = "button-container";
const id_car_container = "car-container";

const class_instruction = "instruction";

const speed = 200;
const sleep = 500;

function stopGame(string){
    if (string === "out") {

    } else {

    }

}

function startGame(){
    document.getElementById(id_cover).style.display = "none";
    document.getElementById(id_container).style.display = "flex";
    document.getElementById(id_third).style.display = "flex";
    setTimeout(function (){
        document.getElementById(id_third).style.display = "none";
        document.getElementById(id_second).style.display = "flex";
        setTimeout(function () {
            document.getElementById(id_second).style.display = "none";
            document.getElementById(id_first).style.display = "flex";
            setTimeout(function () {
                document.getElementById(id_first).style.display = "none";
                startRide();
                },sleep);
        }, sleep);
    }, sleep)
    console.log("func");
}

function startRide(){
    console.log("ride");
    let incx = 20;
    let incy = 0;
    let car = document.getElementById(id_car_container);
    let road = document.getElementById(id_road);
    let move = setTimeout(function moveCar(){
        function drawImageFromWebUrl(sourceurl){
            let img = new Image();
            img.addEventListener("load", function () {
                car.getContext("2d").drawImage(img, 0, 0, img.width,    img.height, 0, 0, car.width, car.height);
            });
            img.setAttribute("src", sourceurl);
        }
        drawImageFromWebUrl("http://95.154.71.136/game/img/car.png");
        let pos = getPosition(car);
        let x = window.screen.width - pos.x;
        let y = window.screen.height - pos.y;

        let c = car.getContext("2d");
        let p = c.getImageData(pos.x, pos.y, 1, 1).data;
        console.log(p);
        let hex = "#" + ("000000" + rgbToHex(p).slice(-6));
        document.getElementById(id_button_container).onmousedown = function (){
            if ((pos.x > (window.screen.width*2/3) + 40)&&(pos.y > (window.screen.height/2 + 20))) {
                incx = 0;
                incy = -20;
            }else{
                if ((pos.x < (window.screen.width/3) - 60)&&(pos.y < (window.screen.height/2 - 20))) {
                    incx = 0;
                    incy = 20;
                }else{
                    if ((pos.y < (window.screen.height/2))&&(pos.x > (window.screen.width/2))){
                        incy = 20;
                        incx = 20;
                    }else{
                        if ((pos.y < (window.screen.height/2))&&(pos.x < (window.screen.width/2))){
                            incy = 20;
                            incx = -20;
                        }else{
                            if ((pos.y > (window.screen.height/2))&&(pos.x > (window.screen.width/2))){
                                incy = -20;
                                incx = 20;
                            }else{
                                    incy = -20;
                                    incx = -20;
                                }
                        }
                    }
                }
            }
        }
        document.getElementById(id_button_container).onmouseup = function (){
            if (pos.x > (window.screen.width*2/3) + 50){
                incx = 0;
                incy = -20;
            } else {
                if (pos.x < (window.screen.width/3) - 70){
                    incx = 0;
                    incy = 20;
                }else
                    if (pos.y < (window.screen.height/2)){
                        incy = 0;
                        incx = -20;
                    } else {
                        incy = 0;
                        incx = 20;
                    }
            }
        }

        if (pos.x > (window.screen.width*2/3) + 60) {
            incx = -20;
            incy = 0;
        }
        if (pos.x < (window.screen.width/3) - 80) {
            incx = 20;
            incy = 0;
        }

        document.getElementById(id_car_container).style.left = `${pos.x + incx}px`;
        document.getElementById(id_car_container).style.top = `${pos.y + incy}px`;

        console.log(hex);

        if ((hex !== "#a09071")||
            ((pos.x*pos.x/(((window.screen.width*2/3) + 60)*((window.screen.width*2/3) + 60)) +
                (pos.y*pos.y/((window.screen.height/2)*(window.screen.width/2))))>1)){
            clearTimeout(move);
            stopGame("out");
        }

        if (hex === "#ffffff"){
            clearTimeout(move);
            stopGame("win");
        }
        move = setTimeout(moveCar, speed);
    },speed);


    function getPosition(obj) {
        let curleft = 0;
        let curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj == obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    function rgbToHex(pixel) {
        if (pixel[0] > 255 || pixel[1] > 255 || pixel[2] > 255)
            throw "Invalid color component";
        return ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16);
    }
}
document.getElementById(id_start).onclick = startGame;