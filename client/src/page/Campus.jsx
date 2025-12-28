import React , {useState,useEffect} from "react";
import api from "../api/axios.js";

function Campus (){
    const [form,setform] = useState({})
    const [loading,setloading] = useState(true)
    const EducationalLevel = ["Lower than High School","Junior High School","Senior High School"
        ,"Vocational certificate","Technical certificate","High vocational certificate","Diploma"
        ,"Bachelor Degree","Master's Degree","Doctoral Degree"]
    const fields = ["Information Technology & Computer", "Engineering", "Science", "Mathematics & Statistics", "Business & Management", "Accounting & Finance", "Economics", "Law",
        "Political Science & Public Administration", "Communication Arts & Media", "Humanities", "Social Sciences", "Psychology", "Education", "Medicine", "Nursing & Public Health", "Pharmacy & Health Sciences", "Sports Science" , "Architecture & Design", "Fine Arts & Music", "Digital Media & Multimedia", "Tourism & Hospitality", "Logistics & Supply Chain", "Agriculture & Food Technology", "Environment & Natural Resources", "Industrial & Manufacturing", "Vocational Education",
        "Others"
    ];
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
                            <div className="row mt-2">
                                <div className="col-sm">
                                    <label id="Educationallevel" className="form-label mt-2">Educational Level</label>
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
                            <div className="row mt-2">
                                <div className="col-sm-4">
                                    <label id="School" className="form-label mt-2">School</label>
                                    <input type="text" style={{minWidth:340}} className="form-control" id="School" value={form?.School} onChange={(e)=>{
                                        handlechange("School",e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm">
                                    <label id="Field" className="form-label mt-2">Field of Study</label>
                                    <select id="Field" className="form-select" value={form?.FieldStudy} onChange={(e)=>{
                                        handlechange("Field",e.target.value)
                                    }}>
                                        <option value="">Select
                                        </option>{fields.map((field)=>(
                                        <option key={field} value={field}>{field}</option>
                                    ))}
                                    </select>

                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-4">
                                    <label id="Faculty" className="form-label mt-2">Faculty</label>
                                    <input type="text" style={{minWidth:340}} className="form-control" id="Faculty" placeholder="Enter" value={form?.Faculty} onChange={(e)=>{
                                        handlechange("Faculty",e.target.value)
                                    }}/>

                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-4">
                                    <label id="Degree" className="form-label mt-2">Degree</label>
                                    <input type="text" style={{minWidth:340}} className="form-control" id="Degree" placeholder="e.g. B.S or B.B.A" value={form?.Degree} onChange={(e)=>{
                                        handlechange("Degree",e.target.value)
                                    }}/>

                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-4">
                                    <label id="Major" className="form-label mt-2">Major</label>
                                    <input type="text" style={{minWidth:340}} className="form-control" id="Major" placeholder="Enter" value={form?.Major} onChange={(e)=>{
                                        handlechange("Major",e.target.value)
                                    }}/>

                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-4 me-5">
                                    <label id="GraduationYear" className="form-label mt-2">Graduation-Year</label>
                                    <input type="text"  className="form-control" id="GraduationYear" placeholder="Enter" value={form?.Year} onChange={(e)=>{
                                        handlechange("GraduationYear",e.target.value)
                                    }}/>

                                </div>
                                <div className="col-sm-4 me-5">
                                    <label id="GraduationYear" className="form-label mt-2">GPA</label>
                                    <input type="text"  className="form-control" id="GraduationYear" placeholder="Enter" value={form?.Year} onChange={(e)=>{
                                        handlechange("GraduationYear",e.target.value)
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