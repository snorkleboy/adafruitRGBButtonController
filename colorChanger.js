const colorNames = {
    'red': "RED",
    "blue": "BLUE",
    "green": "GREEN"
}


const setColor =(colorName,pins)=>{
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
        red: 0,
        blue: 1,
        green: 1
    },
    [colorNames.blue]: {
        red: 1,
        blue: 0,
        green: 1
    },
    [colorNames.green]: {
        red: 1,
        blue: 1,
        green: 0
    }
}

console.log("COLOR CHANGER",{colors,colorNames})

module.exports = {
    setColor, colorNames
}