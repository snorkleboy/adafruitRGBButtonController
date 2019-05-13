
const pinColors={'red':'REDPIN','green':"GREENPIN",'blue':"BLUEPIN"}
pinColors['r'] = pinColors['red'];
pinColors['g'] = pinColors['green'];
pinColors['b'] = pinColors['blue'];

const setColor =(pinValues,pins)=>{
    Object.entries(pinValues).forEach(([pinColorLetter,value])=>{
        const pinColorName = pinColors[pinColorLetter];
        const pin = pins[pinColorName];
        console.log({
            pinColorName, pinColorLetter, value
        })
        if(!pin){
            throw new Error(`couldnt find corresponding pin -${JSON.stringify({pinColorName,pinValues,pins})}`, )
        }
        if(pin.pwm__){
            pin.pwmWrite(pwmCommonAnodeConversion(value));
        }else{
            pin.digitalWrite(Math.floor(commonAnodeConversion(value)));
        }
    })
}
const pwmCommonAnodeConversion = (val)=>{
    if(val > 255){
        throw new Error("pwm values must be between 0-255, received " + val);
    }
    return 255-val;
}
const commonAnodeConversion = (val)=>{
    if(val == 0){
        return 1;
    }else{
        return 0;
    }
}


module.exports = {
    setColor, pinColors
}