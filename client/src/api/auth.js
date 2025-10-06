import api , {setAccessToken} from "./axios.js";
import {startInactive,stopInactive,touchActivity} from "./authcontroltime.js";
function notifyAuthChanged() {
    window.dispatchEvent(new Event("authChanged"));
}
export async function registers(email,password,name,lastname){
        await  api.post("/api/register",{email,password,name,lastname})
}

export  async function login(email,password){
       const{data} = await  api.post("/api/login",{email,password})
    setAccessToken(data.accessToken)
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
    setAccessToken(null)
    localStorage.removeItem("user");
}