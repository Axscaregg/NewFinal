import axios from "axios";
import {setAccessTokenAfterRefresh,handleAuthExpired} from "./session.js";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})


let accessToken = null
export  const setAccessToken = (t) =>{
    accessToken = t || null
    if (t) api.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    else delete api.defaults.headers.common["Authorization"];
}

const saved = localStorage.getItem("accessToken");
if (saved) setAccessToken(saved);

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken")
    if(token) config.headers["Authorization"] = `Bearer ${token}`
        return config
    })

let isRefresh =  false
let queue = []
const processqueue = (err,token = null) =>{
  queue.forEach(prom =>{
      if(err){
          prom.reject(err)
      }else prom.resolve(token)
  })
    queue = []
}

api.interceptors.response.use((res) =>res, async (error) =>{
    const original = error.config
    if(!error.response||error.response.status !== 401 || original._retry){
        return Promise.reject(error)
    }
    if(isRefresh){
        return  new Promise((resolve,reject)=>{
            queue.push({resolve,reject})
        }).then(token=>{
            original.headers['Authorization'] ='Bearer' + token
        })
    }
    original._retry = true;
    isRefresh = true
    try{
        const {data} = await  api.post("/api/refresh")
        const newToken = data?.accessToken
        if(!newToken) throw new Error("No access token in refresh response")
        localStorage.setItem("accessToken",newToken)
        processqueue(null,newToken)
        original.headers.Authorization =  `Bearer ${newToken}`
        return  api(original)

    }catch (e){
        processqueue(e, null);
        handleAuthExpired();
        return Promise.reject(e);
    }finally {
        isRefresh = false
    }
} )
export  default  api