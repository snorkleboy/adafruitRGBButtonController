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
            pin.pwmWrite(0);
        }else{
            pin.digitalWrite(0);
        }
    })
}
const pinRegistration = (color,pin,pwm=false)=>({color,pin,pwm})

pinRegistration.colors = pinColors;
//pins 11,13,15
const defaultPinRegistrations = [
    pinRegistration(pinColors.red, 17),
    pinRegistration(pinColors.blue, 27),
    pinRegistration(pinColors.green, 22)
];


function setup({colorPins=defaultPinRegistrations}={}){
    colorPins.forEach(pin=>{
        const activeatedPin = new Gpio(pin.pin,{mode:Gpio.OUTPUT});
        activeatedPin.pwm__ = pin.pwm;
        activeColorPins[pin.color] = activeatedPin;
    })

    state.init((state) => colorChanger.setColor(state.color,activeColorPins));
}

//

const colorPins = [pinRegistration(pinColors.red, 18, true),
    pinRegistration(pinColors.blue, 27),
    pinRegistration(pinColors.green, 22)
];

setup({
    colorPins
});
let r = 0
const i = setInterval(()=>{
    r = r + 10;
    r = r % 255;
    state.setState({
        color: {
            r,
            g: 1,
            b: 0
        }
    })
},50)
intervals["debug"] = i;

setTimeout(()=>{
    cleanUp();
},10000)

//

module.exports = {
    setup,
    pinRegistration,
    cleanUp,
    colors,
    defaultPinRegistrations,
    getState:state.getState,
    setState:state.setState,
}