## AdaFruit RGB PushButton Controller
node based controller for AdaFruit rugged metal rgb momentary pushbutton(https://www.adafruit.com/product/3350) (push button not implimented yet)

built on top of pigpio;



index exports = {
    setup,
    pinRegistration,
    cleanUp,
    colors,
    defaultPinRegistrations,
    defaultPWMPinRegistrations,
    getState:state.getState,
    setState:state.setState,
}


### setup and pinRegistration, defaultRegistrations

setup currenty takes in object of 
```
{
    colorPins:[
        {
            color (one of pinRegistration.colors),
            pin (gpio pin number, not physical number),
            pwm (bool)
        },...otherPins
    ]
}
```

a pin registrations can be made using the pinRegistration function like

```
const pins = [
    pinRegistration(pinRegistration.colors.red, 18, shouldBePWMBool),
    pinRegistration(pinRegistration.colors.blue, 27),
    pinRegistration(pinRegistration.colors.green, 22)
 ]
```

the default registrations is
```
const defaultPinRegistrations = [
    pinRegistration(pinColors.red, 17),
    pinRegistration(pinColors.blue, 27),
    pinRegistration(pinColors.green, 22)
];
```

also exported is a default pwm registration

```
const defaultPWMPinRegistrations = [
    pinRegistration(pinColors.red, 18, true),
    pinRegistration(pinColors.blue, 27),
    pinRegistration(pinColors.green, 22)
];
```

### cleanup

this function will just set voltage to 0 on all used pins. The pigpio is supposed to automatically handle terminating everything else.

### setState, getState, colors

getState() returns the current state.

setState({colors:{r:num,g:num,b:num}}) will change the color state of the button. if PWM the number should be between 0-255. For non PWM any number other than 0 is interpreted as a 1;

colors is a hash of preset colors, can be called like setState(colors.red);