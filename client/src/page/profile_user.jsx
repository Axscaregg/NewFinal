import React ,{useState,useEffect}from "react"
import api from "../api/axios.js";
import axios from "axios";
function  Profile_user(){
    const [form,setform] = useState({})
    const [loading,setloading] = useState(true  )
    const [error,seterror] = useState("")

    useEffect( ()=>{
        const controller = new AbortController();
        (async ()=>{
            try {

                const {data} = await api.get("profile/me",{
                    signal: controller.signal
                })
                setform(data)
                console.log(form)
            }catch (e){
                if (axios.isCancel(e)) {

                    console.log("Request was canceled, this is normal in development.");
                } else {

                    console.error("Error condition", e);
                    seterror("Profile invalid");
                }
            }finally {
                setloading(false)
            }
        })()
        return ()=>{
            controller.abort()
        }

    },[])

    return(
        <div className="container-xxl mt-3 my-md4 ">
            <div className="row">
                <div className="col-lg-3 mb-4">

                    <div className="flex align-items-start">
                        <div className="accordion  my-accordion w-75"  >
                            <div className="accordion-item">
                                <h2  className="accordion-header">
                                    <button className="accordion-button" type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseOne"
                                            aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Account
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne"
                                     className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <div className="list-group">
                                            <button type="button"
                                                    className="list-group-item list-group-item-action "
                                                    aria-current="true">
                                                Profile
                                            </button>
                                            <div className="my-2"></div>
                                            <button type="button"
                                                    className="list-group-item list-group-item-action "
                                                    aria-current="true">
                                                Education
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-lg-8">
                    <div className="card mb-4">
                        <img src="..    ." className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <div className="card-title">
                                <h5 className="text-center">About Me</h5>
                            </div>
                            <div className="row">
                               <div className="col-sm-5">
                                   <p className="card-text ">Name: {form?.name}</p>
                               </div>
                                <div className="col-sm-5">
                                    <p className="card-text ">Name: {form?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default  Profile_user