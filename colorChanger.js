const colorNames = {
    'red': "RED",
    "blue": "BLUE",
    "green": "GREEN"
}
const pinColors={'red':'REDPIN','green':"GREENPIN",'blue':"BLUEPIN"}

const setColor =(colorName,pins)=>{
console.log("SETCOLOR",{colorName,pins});
    if(!Object.keys(colors).includes(colorName)){
        throw new Error(`unknown color ${JSON.stringify({colorName,colors})}`)
    }
    const pinValues = colors[colorName];
    Object.entries(pinValues).forEach(([pinColorName,value])=>{
        const pin = pins[pinColorName];
        if(!pin){
            throw new Error(`couldnt find corresponding pin ${{pinColorName,pins,colorName}}`, )
        }
        pin.writeSync(value);
    })
}

const colors = {
    [colorNames.red]: {
        [pinColors.red]: 0,
        [pinColors.blue]: 1,
        [pinColors.green]: 1
    },
    [colorNames.blue]: {
        [pinColors.red]: 1,
        [pinColors.blue]: 0,
        [pinColors.green]: 1
    },
    [colorNames.green]: {
        [pinColors.red]: 1,
        [pinColors.blue]: 1,
        [pinColors.green]: 0
    }
}

console.log("COLOR CHANGER",{colors,colorNames})

module.exports = {
    setColor, colorNames,pinColors
}