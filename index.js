const Gpio = require('onoff').Gpio;
function setup(){
    const red = new Gpio(11, 'out');
    const green = new Gpio(13, 'out');
    const blue = new Gpio(15, 'out');


    let val = 0;
    const blink = setInterval(() => {
        val = val == 0 ? 1 : 0;
        console.log(red.readSync());
        red.writeSync(val);
    }, 200);

    process.on('SIGINT', () => {
        clearInterval(blink);
        red.unexport();
        green.unexport();
        blue.unexport();
    });
}


module.exports = {
    setup
}