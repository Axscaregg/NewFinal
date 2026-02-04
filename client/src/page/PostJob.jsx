import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Richtext from "../component/Richtext.jsx";

import EmployerBar from "../component/EmployerBar.jsx";
import api from "../api/axios.js"
function PostJob() {
    const [form, setform] = useState({})
    const [file,setfile] = useState(null)
    const [error,seterror] = useState(null)
    const [isediting,setisediting]  = useState(true)
    const JobCategory = ["T1","T2","T3"]
    const JobType = ["Full Time","Past Time","Contractor","Freelance"]
    const Experience = ["Fresh","1 Year","2 Year","3 Year","4 Year","More Than 4"]
    const joblevelup    = ["Junior Level","Mid Level","Manager","Team Leader","Senior Level"]
    const Degree = ["10th Class",["12th Class"],["Bachelore Degree"],["Master Degree"],["Post Graduate"],["Any Other"]]
    const gender = ["Male","Female","Other"]

    const Id = localStorage.getItem("user")
    const ObjectID = JSON.parse(Id)
    const handleImg = async () => {
        const formdata = new FormData()
        formdata.append('userID', ObjectID.id)
        formdata.append('avatar', file)
        try{
            const res = await api.post('/uploads',formdata,{
                        headers:{"Content-Type":"multipart/form-data"}
            })
            alert("Success")
        }catch(e){
            console.log("Save error: ",e)
            alert("Something went wrong")
        }
    }
    const handlechange = (name,values) =>{
        setform((prev)=>{
            return {...prev,[name]:values,
            }
        })
    }
    return (
        <div className="container-xxl  pt-0">
            <div className="row mt-4 ">
                    <EmployerBar />
                <div className="col-xxl-9">
                    <h1 className="mb-1 fs-3 fw-medium">Post Jobs</h1>
                    <div className="row ms-2">
                        <nav className="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item text-muted"><Link to="#">Employer</Link></li>
                                <li className="breadcrumb-item text-muted"><Link to="#">Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to="#" className="text-main">Post Jobs</Link></li>
                            </ol>
                        </nav>
                    </div>
                    <div className="card d-flex px-0 py-0">
                        <div className="card-header ">
                            <h6>Basic Detail</h6>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xxl-9">
                                        <div className="justify-content-start align-items-start mb-2">
                                           <div>img </div>
                                        </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <label htmlFor="JobTilte" className="form-label">Job Title</label>
                                    <input className="form-control" id="JobTilte" type="text" placeholder="Job Title"
                                           value={form?.JobTilte} onChange={(e)=>{
                                               handlechange("JobTilte",e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="Jobsummary" className="form-label">Job_summary</label>
                                    <Richtext value={form?.Jobsummary ||""}
                                              onChange={(e)=> handlechange("Jobsummary", e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="Responsibilities" className="form-label">Responsibilities</label>
                                    <Richtext value={form?.Jobsummary ||""}
                                              onChange={(e)=> handlechange("Responsibilities", e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="Qualifications" className="form-label">Qualifications</label>
                                    <Richtext value={form?.Jobsummary ||""}
                                              onChange={(e)=> handlechange("Qualifications", e)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="JobCategory" className="form-label">Job Category</label>
                                        <select id ="inputJobCategory" className="form-select" value={form?.JobCategory} onChange={(e)=>{
                                            handlechange("JobCategory",e.target.value)
                                        }}>
                                            <option value = "">Select

                                            </option>{JobCategory.map((work) =>( <option key={work} value={work}>{work}</option>))}

                                        </select>
                                </div>
                                <div className="col-xxl">
                                    <label htmlFor="JobType" className="form-label">Job Type</label>
                                    <select id ="inputJobType" className="form-select" value={form?.JobType} onChange={(e)=>{
                                        handlechange("JobType",e.target.value)
                                    }}>
                                        <option value = "">Select

                                        </option>{JobType.map((work) =>( <option key={work} value={work}>{work}</option>))}

                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="Experience" className="form-label">Experience</label>
                                    <select id="InputExp" className="form-select" value={form?.Experience} onChange={(e)=>{
                                        handlechange("Experience",e.target.value)
                                    }}>
                                        <option value="">Select
                                        </option>{Experience.map((work)=>( <option key={work} value={work}>{work}</option> ))}
                                    </select>
                                </div>
                                <div className="col-xxl">
                                    <label htmlFor="JobLevel" className="form-label">Job Level</label>
                                    <select id="Joblevel" className="form-select" value={form?.JobLevel} onChange={(e)=>{
                                        handlechange("JobLevel",e.target.value)
                                    }}>
                                        <option value="">
                                            Select
                                        </option>{joblevelup.map((work)=>(<option key={work} value={work}>{work}</option>))}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="Degree" className="form-label">Degree Education</label>
                                    <select id="EducationDegree" className="form-select" value={form?.EducationDegree} onChange={(e)=>{
                                        handlechange("EducationDegree",e.target.value)
                                    }}>
                                        <option value="">
                                            Select
                                        </option>{Degree.map((work)=>(<option key={work} value={work}>{work}</option> ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-xxl">
                                    <label htmlFor="Position" className="form-label">Position</label>
                                    <input type="text" className="form-control" id="Position" placeholder="Position Offer" value={form?.PositionWork} onChange={(e)=>{
                                        handlechange("PositionWork",e.target.value)
                                    }}/>
                                </div>
                                <div className="col-xxl">
                                    <label htmlFor="Gender" className="form-label">Gender</label>
                                    <select id="Gender" className="form-select" value={form?.Gender} onChange={(e)=>{
                                        handlechange("Gender",e.target.value)
                                    }}>
                                        <option value="">
                                            Select
                                        </option>{gender.map((work)=>(<option key={work} value={work}>{work}</option> ))}
                                    </select>
                                </div>
                            </div>
                                <div className="row mt-2">
                                    <div className="col-xxl">
                                        <label htmlFor="MinSalary" className="form-label">Min Salary</label>
                                        <input type="text" className="form-control" id="MinSalary" placeholder="ex. $5000" value={form?.MinSalary} onChange={(e)=>{
                                            handlechange("MinSalary",e.target.value)
                                        }}/>
                                    </div>
                                    <div className="col-xxl">
                                            <label htmlFor="MaxSalary" className="form-label">Max Salary</label>
                                            <input type="text" className="form-control" id="MaxSalary" placeholder="ex. $5000" value={form?.MaxSalary} onChange={(e)=>{
                                            handlechange("MaxSalary",e.target.value)
                                        }}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xxl">
                                        <label htmlFor="Address" className="form-label">Permanent Address</label>
                                        <input type="text" className="form-control" id="Address" placeholder="" value={form?.Address} onChange={(e)=>{
                                            handlechange("Address",e.target.value)
                                        }}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xxl">
                                        <label htmlFor="Country" className="form-label">Country</label>
                                        <input type="text" className="form-control" id="Country" placeholder="" value={form?.Country} onChange={(e)=>{
                                            handlechange("Country",e.target.value)
                                        }}/>
                                    </div>
                                    <div className="col-xxl">
                                        <label htmlFor="City" className="form-label">State/City</label>
                                        <input type="text" className="form-control" id="City" placeholder="" value={form?.City} onChange={(e)=>{
                                            handlechange("City",e.target.value)
                                        }}/>
                                    </div>
                                </div>
                                <div className="col-xxl-3 mt-5">
                                    <button type="submit" className="btn btn-primary"  >Save changes</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default PostJob