import React , {useState,useEffect} from "react";
import api from "../api/axios.js";

function Campus (){
    const [form,setform] = useState({})
    const [loading,setloading] = useState(true)
    const EducationalLevel = ["Lower than High School","Junior High School","Senior High School"
        ,"Vocational certificate","Technical certificate","High vocational certificate","Diploma"
        ,"Bachelor Degree","Master's Degree","Doctoral Degree"]
    const [error,seterror] = useState("")
    const handlechange = (name,value) =>{
        setform((prev) =>{
            return{...prev,[name]:value}
        })
    }
    return(
        <div className="container-xxl mt-3 my-md-4">
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
                                            <a className="list-group-item list-group-item-action " role="button" aria-current="true" href="/profile/me">
                                                Profile
                                            </a>
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
                <div className="col-lg-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm">
                                    <label id="Educationallevel" className="form-label">Educational Level</label>
                                    <select id="Educationallevel" className="form-select" value={form?.EducationLevel} onChange={(e)=>{
                                        handlechange("EducationLevel",e.target.value)
                                    }}>
                                        <option value="">Select
                                        </option>{EducationalLevel.map((Edu)=>(
                                            <option key={Edu} value={Edu}>{Edu}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label id="School" className="form-label">School</label>
                                    <input type="text" style={{minWidth:340}} className="form-control" id="School" value={form?.School} onChange={(e)=>{
                                        handlechange("School",e.target.value)
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export  default  Campus