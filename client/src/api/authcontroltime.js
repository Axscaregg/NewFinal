import {data} from "react-router-dom";

const channel = new BroadcastChannel("auth")
const Local_key = "lastActivity"
const INACTIVITY_LIMIT_MS = 15 * 60 * 1000;

let timer = null
let onTimeoutCB = null

export function  touchActivity(){
    const now = Date.now()
    localStorage.setItem(Local_key,String(now))
    channel.postMessage({type: "activity",now})
    if(timer){
        timer = setTimeout(fireTimeout,INACTIVITY_LIMIT_MS)
    }
}
function  fireTimeout(){
    const last = Number(localStorage.getItem(Local_key) || 0)
    const idel = Date.now()-last
    if(idel >= INACTIVITY_LIMIT_MS && onTimeoutCB){
        onTimeoutCB()
    }else {
        const left =  Math.max(INACTIVITY_LIMIT_MS-idel,1000)
        timer = setTimeout(fireTimeout,left)
    }

}
function  bindEvent(){
    const event = ["click","keydown","mousemove","scroll","touchstart","visibilitychange"]
    const handler =() =>{
        if (document.visibilityState ==="hidden") return
        touchActivity()
    }
    event.forEach((ev) => window.addEventListener(ev,handler,{passive:true}))
    return()=>event.forEach((ev)=> window.removeEventListener(ev,handler))
}
let unbind = null
let unchannel = false

export function startInactive(onTimeout) {
    onTimeoutCB = onTimeout
    if(!localStorage.getItem(Local_key)){
            localStorage.setItem(Local_key,String(Date.now()))
    }
    unbind = bindEvent()
    timer = setTimeout(fireTimeout,INACTIVITY_LIMIT_MS)
    if(!unchannel){
        channel.onmessage = (e)=>{
            if(e.data?.type === "activity"){
                if(timer){
                    clearTimeout(timer)
                    timer = setTimeout(fireTimeout,INACTIVITY_LIMIT_MS)
                }
            }
        }
    }
}
export  function  stopInactive() {
    if (timer) {
        clearTimeout(timer);
        timer = null
    }
    if(unbind){unbind();unbind =null}
    onTimeoutCB =null
}