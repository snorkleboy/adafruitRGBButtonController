const Gpio = require('pigpio').Gpio; 
// const Gpio = require('pigpio-mock').Gpio;

const state = require("./state");
const colorChanger = require("./colorChanger");
const colors = require("./colors");
const pinColors = colorChanger.pinColors;

let activeColorPins = {};
let intervals = {};

function cleanUp(){
    Object.values(intervals).forEach(i=>clearInterval(i));
    Object.values(activeColorPins).forEach(pin=>{
        if(pin.pwm__){
            led.pwmWrite(0);
        }else{
            pin.digitalWrite(0);
        }
    })
}
const pinRegistration = (color,pin,pwm=false)=>({color,pin,pwm})

pinRegistration.colors = pinColors;
//pins 11,13,15
const dColorPins = [
    pinRegistration(pinColors.red, 17),
    pinRegistration(pinColors.blue, 27),
    pinRegistration(pinColors.green, 22)
];


function setup({colorPins=dColorPins}={}){
    colorPins.forEach(pin=>{
        const activeatedPin = new Gpio(pin.pin,{mode:Gpio.OUTPUT});
        activeatedPin.pwm__ = pin.pwm;
        activeColorPins[pin.color] = activeatedPin;
    })

    state.init((state) => colorChanger.setColor(state.color,activeColorPins));
}

function randomBlinker(){
    const random = () => Math.random() > .5 ? 0 : 1
    const inName = "randomBlinker";
    const interval = 200;
    const times = 10;
    intervals[inName] = (setInterval(() => {
        let vals = [random(), random(), random()];
        Object.entries(activeColorPins).forEach(([color, pin], i) => {
            pin.digitalWrite(vals[i])
            console.log({
                color,
                cv: pin.digitalRead(),
                nv: vals[i]
            })
        })
    }, interval));

    setTimeout(() => clearInterval(intervals[inName]),interval*times);
}
//
setup();
console.log(state.getState());
state.setState(colors.red)
let exit = false;
setTimeout(()=>{
    cleanUp();
},500)

//

module.exports = {
    setup,
    pinRegistration,
    cleanUp,
    colors,
    getState:state.getState,
    setState:state.setState,
    randomBlinker
}