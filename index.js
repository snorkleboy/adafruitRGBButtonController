const Gpio = require('onoff').Gpio;
const state = require("./state");
const colorChanger = require("./colorChanger");
const colors = colorChanger.colorNames;
const pinColors = colorChanger.pinColors;
let activeColorPins = {};
let intervals = {};

function cleanUp(){
    Object.values(intervals).forEach(i=>clearInterval(i));
    Object.values(activeColorPins).forEach(pin=>{
        pin.writeSync(0);
        pin.unexport();
    })
}
const pinRegistration = (color,pin)=>({color,pin})

pinRegistration.colors = pinColors;
//pins 11,13,15
const dColorPins = [
    pinRegistration(pinColors.red, 17),
    pinRegistration(pinColors.blue, 27),
    pinRegistration(pinColors.green, 22)
];


function setup({colorPins=dColorPins}={}){
    colorPins.forEach(pin=>{
        activeColorPins[pin.color] = new Gpio(pin.pin,'out');
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
            pin.writeSync(vals[i])
            console.log({
                color,
                cv: pin.readSync(),
                nv: vals[i]
            })
        })
    }, interval));

    setTimeout(() => clearInterval(intervals[inName]),interval*times);
}
//
setup();
console.log(state.getState());
state.setState({color:colors.red})
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