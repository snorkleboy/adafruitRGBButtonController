


let state = {
    color: null
}
let stateChangeCallBack = ()=>console.log("no callback for state change");
function init(cb){
    stateChangeCallBack = cb;
}
function setState(stateIn) {
    const newState = {
        ...state,
        ...stateIn
    };
    console.log("SETSTATE", {
        newState,
        oldState: state,
        stateIn
    })
    state = newState;
    stateChangeCallBack(state);
}

function getState() {
    return state;
}
console.log("STATE",state);

module.exports = {
    init,
    getState,
    setState
};