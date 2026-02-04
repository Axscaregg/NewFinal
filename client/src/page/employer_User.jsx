import React from "react";
import api from "../api/axios.js";
import {useState,useEffect} from "react";
import Richtext from "../component/Richtext.jsx";
import  Sidebar from "../component/Sidebar.jsx";
import DOMPurify from "dompurify";
function employer_User() {
    const [form,setform] = useState({})
    const [backup, setbackup] = useState({})
    const [error,seterror] = useState("")
    const [isediting,setisediting] = useState(false)
    const [loading,setloading] = useState(true)
    const [Apidata, setApidata] = useState({})
    const id = localStorage.getItem("user")
    const storageObject = JSON.parse(id)
    const [refresh, setRefresh] = useState(0);
    useEffect(()=>{
        const fetchApi = async () => {
            try{
                const {data} = await api.get("profile/me")
                if(data){
                    setApidata(data)
                    setform(data.Profile)
                    setbackup(data.Profile)}

            }catch(err){
                console.log("Api error",error)
                seterror("Loading Error")
            }finally {
                setloading(false)
            }
        }
        fetchApi()
    },[refresh])
    const handlecanscel = ()=>{
        setform(backup)
        setisediting(false)
        setRefresh((r) => r + 1);

    }

    const submit = async e => {
        setloading(true)
        seterror("")
         try{
            const res = await  api.post("/Em/UpdateEm", {
                id: storageObject.id,
                Role: form?.Role,
                Location: form?.Location,
                Facebook: form?.Facebook,
                LineId:form?.LineId,
                AboutMe: form?.AboutMe,
            })
             console.log("Success")
         }catch(error){
            console.log("Error Input Data",error)
            seterror("An unexpected error occurred. Please try again.")
        }finally{
            setloading(false)
             setisediting(false)
             setRefresh((r) => r + 1);

         }
    }

    const handlechange = (name,values) =>{
        setform((prev)=>{
            return {...prev,[name]:values,
           }
        })
    }


    return (
        <>
        <div className="container-xxl ">
           <div className="row mt-4">
               <Sidebar/>
               <div className="col-lg-8">
                   <div className="card">
                       <div className="card-title">
                           Profile
                       </div>
                       <div className="card-body">
                           <div className="row">
                               <div className="col">
                                   <div className="card-text">Name: {Apidata?.general?.Name}</div>
                               </div>
                                <div className="col">
                                    <div className="card-text">Email: {Apidata?.general?.Emailc}</div>
                                </div>
                           </div>
                           <div className=" mt-3" >Type Employer: {Apidata?.accountType}</div>
                           <div className="mt-4">Detail: {<span dangerouslySetInnerHTML={{
                               __html: DOMPurify.sanitize(form?.AboutMe || "<p></p>"),
                           }}/>   }</div>
                       </div>
                   </div>

                   <div className="card">
                       <div className="card-title">
                           <h4>Basic Detail</h4>
                       </div>
                       <div className="card-body">
                           <div className="row">
                               <div className="col-md">
                                 <label htmlFor="Role" className="form-label">Role</label>
                                 <input className="form-control" id="Role" type="text" value={form?.Role}   onChange={(e)=>{
                                     handlechange("Role", e.target.value);
                                 }}  readOnly={!isediting}/>
                               </div>
                               <div className="col-md">
                                   <label htmlFor="Location" className="form-label">Location</label>
                                   <input className="form-control" id="Location" type="text" value={form?.Location} onChange={(e)=>{
                                       handlechange("Location", e.target.value);
                                   }} readOnly={!isediting} />
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md">
                                   <label htmlFor="Facebook" className="form-label">Facebook</label>
                                   <input id="Facebook" className="form-control" type="text" value={form?.Facebook} onChange={(e)=>{
                                       handlechange("Facebook", e.target.value)
                                   }} readOnly={!isediting}/>
                               </div>
                               <div className="col-md">
                                   <label htmlFor="LineId" className="form-label">Line</label>
                                   <input id="LineId" type="text" className="form-control" value={form?.LineId} onChange={(e)=>{
                                       handlechange("LineId", e.target.value)
                                   }} readOnly={!isediting}/>
                               </div>
                           </div>
                           <div className="row">
                               <div className="col-md">
                                   <label htmlFor="AboutMe" className="form-label">AboutMe</label>
                                   <Richtext
                                       value={form?.AboutMe || ""}
                                       onChange={(html) => handlechange("AboutMe", html)}
                                       editable={isediting}
                                   />
                               </div>
                           </div>

                       </div>
                   </div>
                   {isediting? (
                       <>
                           <button type="button" className="btn  btn-outline-primary mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled={loading} >Save</button>
                           <button type="button" className="btn btn-secondary ms-2" onClick={handlecanscel}>
                               Cancel
                           </button>
                       </>
                   ):(
                       <button type="button" className="btn btn-outline-primary mt-4" onClick={() => setisediting(true)}>
                           Edit Profile
                       </button>
                   )
                   }
               </div>
           </div>
        </div>
                <div className="modal fade " tabIndex="-1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                     aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                               <div className="row">
                                   <h3 >Save For Change</h3>
                               </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal"  onClick={submit}>Save changes</button>
                            </div>

                        </div>
                    </div>
                </div>

        </>
    )
}

export default employer_User;