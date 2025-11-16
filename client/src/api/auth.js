import api , {setAccessToken} from "./axios.js";
import {startInactive,stopInactive,touchActivity} from "./authcontroltime.js";
function notifyAuthChanged() {
    window.dispatchEvent(new Event("authChange"));
}
export async function registers(email,password,name,lastname,confirmpassword){
        await  api.post("/api/register",{email,password,name,lastname,confirmpassword})
}
export async function registersEm(email,password,confirmpassword){
    await  api.post("/api/register/em",{email,password,confirmpassword})
}


export  async function login(email,password){
       const{data} = await  api.post("/api/login",{email,password})
    localStorage.setItem("accessToken", data.accessToken)
    localStorage.setItem("user", JSON.stringify(data.user));
       notifyAuthChanged()
    startInactive(async ()=>{
        await  logout()
    } )
    touchActivity()
    return data.user
}

export async  function logout(){
    await api.post("/api/logout")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user");
    stopInactive()
}