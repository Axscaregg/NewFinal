import axios from "axios";
import {setAccessTokenAfterRefresh,handleAuthExpired} from "./session.js";

const api = axios.create({
    baseURL: "",
    withCredentials: true
})

let accessToken = null
export  const setAccessToken = (t) =>{
    accessToken = t || null
    if (t) api.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    else delete api.defaults.headers.common["Authorization"];
}

api.interceptors.request.use((config)=>{
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
        return config
    })

let isRefresh =  false
let queue = []
const flushqueue = (err,token = null) =>{
    queue.forEach(({reslove,reject})=>(err ? reject(err): reslove(token)))
    queue = []
}

api.interceptors.response.use((res) =>res, async (error) =>{
    const original = error.config
    if(error?.response?.status !== 401 || original?._retry){
        return Promise.reject(error)
    }
    original._retry = true;
    isRefresh = true
    try{
        const {data} = await  api.post("/api/refresh")
        const newToken = data?.accessToken
        if(!newToken) throw new Error("No access token in refresh response")
        setAccessToken(newToken)
        setAccessTokenAfterRefresh(newToken)
        flushqueue(null,newToken)
        original.header.Authorization =  `Bearer ${accessToken}`
        return  api(original)

    }catch (e){
        flushqueue(e, null);
        handleAuthExpired();
        return Promise.reject(e);
    }finally {
        isRefresh = false
    }
} )
export  default  api