import  {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {registers, registersEm} from "../api/auth.js";

function RegisterEmployer(){
    const [form,setform] = useState({})
    const [loading,setloading] = useState(false)
    const businessTypes = [
        "Technology / IT",
        "Software Development",
        "E-commerce",
        "Manufacturing",
        "Trading / Wholesale / Retail",
        "Logistics / Transportation",
        "Construction / Real Estate",
        "Finance / Banking / Insurance",
        "Accounting / Audit",
        "Education / Training",
        "Healthcare / Medical",
        "Pharmaceutical",
        "Food & Beverage",
        "Hospitality / Hotel / Tourism",
        "Media / Advertising / Marketing",
        "Entertainment / Game / Animation",
        "Agriculture / Food Processing",
        "Energy / Utilities",
        "Automotive",
        "Electronics",
        "Telecommunications",
        "Consulting",
        "HR / Recruitment Agency",
        "Legal / Law Firm",
        "Digital Marketing Agency",
        "SaaS / Platform / Marketplace",
        "Startup",
        "SME",
        "Government / Public Sector",
        "NGO / Non-profit Organization",
        "Other"
    ];
    const [error,seterror] = useState("")
    const navigate = useNavigate()
    const handlechange = (name,values) =>{
        setform((prev)=>{
            return {...prev,[name]:values}
        })
    }
    const submit = async ()=>{
        setloading(true)
        seterror("")
        try {
            if (!form.email || !form.Password || !form.Cpassword) {
                seterror("Error pls ");
                setloading(false); return;
            }

            if (form?.Password !== form?.Cpassword) {
                seterror("Passwords do not match");
                setloading(false);
                return;
            }
            const data = {
                email: form.email,
                password: form.Password,
                confirmpassword: form.Cpassword,
                accountType: form?.type,
                company: {
                    CompanyName: form?.CName,
                    BusinessType: form?.BusinessType,
                    HrName: form?.HrName,
                    HrLastname: form?.HrLastname,
                    Phone: form?.Phone,
                },
                general:{
                    Name: form?.Name,
                    Lastname: form?.Lastname,
                    Emailc: form?.EmailC,
                    Phone: form?.Phone,
                }


            }
            const res=  await registersEm(data)
            console.log(res)
            navigate("/login");

        }  catch (e){
            console.log(e)
            alert(error);
        } finally {
            setloading(false)

        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>

            <div className="card shadow-sm border-0 col-3" style={{maxWidth: "800px", width: "100%"}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login Employer</h3>
                    <div className="row mb-3">
                        <div className="col-md">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter Email" value={form?.email}  onChange={(e) =>{
                                handlechange("email",e.target.value)
                            }}/>
                        </div>
                    </div>
                   <div className="row mb-3">
                       <div className="col-md">
                           <label htmlFor="Password" className="form-label">Password</label>
                           <input type="text" className="form-control" id="Lastname" placeholder="xxxxx" value={form?.Password}  onChange={(e) =>{
                               handlechange("Password",e.target.value)
                           }}/>
                       </div>
                   </div>
                    <div className="row mt-4">
                        <div className="col-md">
                            <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
                            <input type="text" className="form-control" id="Cpassword" placeholder="Password" value={form?.Cpassword}  onChange={(e) =>{
                                handlechange("Cpassword",e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div  className="row mt-4">
                        <div className="col-auto">
                            <input type='radio' id='company' className="form-check-input" name="userType" value="Company" checked={form?.type === "Company"} onChange={(e) =>{
                                handlechange("type",e.target.value)
                            }}/>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="company" className="form-check-label " >Company</label>
                        </div>
                        <div className="col-auto">
                            <input type='radio' id='General' className="form-check-input"  name="userType" value="General" checked={form?.type === "General"} onChange={(e) =>{
                                handlechange("type",e.target.value)
                            }}/>
                        </div>
                        <div className="col-auto">
                            <label htmlFor="General" className="form-check-label " >General</label>
                        </div>
                    </div>
                    <div className="row mt-4">
                        {form.type === "Company" && (
                            <>
                                <div className="row mt-3">
                                    <div className="col-md">
                                        <label htmlFor="CompanyName" className="form-label">Company Name</label>
                                        <input type="text" className="form-control" id="CompanyName" placeholder="Your CompanyName" value={form?.CName}  onChange={(e) =>{
                                            handlechange("CName",e.target.value)
                                        }}/>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md">
                                    <label htmlFor="BusinessType" className="form-label">Business Type</label>
                                        <select id="BusinessType" className="form-select" value={form?.BusinessType} onChange={(e)=>{
                                            handlechange("BusinessType",e.target.value)
                                        }}>
                                            <option value=""> Select
                                            </option>{businessTypes.map((Type)=>(
                                            <option key={Type} value={Type}>{Type}</option>
                                        ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md">
                                        <label htmlFor="HrName" className="form-label">Hr_name</label>
                                        <input className="form-control" id='HrName' value={form?.HrName} placeholder="Hr Name" onChange={(e) =>{
                                            handlechange("HrName",e.target.value)
                                        }}/>
                                    </div>
                                    <div className="col-md">
                                        <label htmlFor="HrLastname" className="form-label">Hr_lastname</label>
                                        <input className="form-control" id='HrLastname' value={form?.HrLastname} placeholder="Hr Name" onChange={(e) =>{
                                            handlechange("HrLastname",e.target.value)
                                        }}/>
                                    </div>
                                </div>
                               <div className="row mt-3">
                                   <div className="col-md">
                                       <label htmlFor="Phone" className="form-label">Phone</label>
                                       <input type="text" className="form-control" id="Phone" placeholder="Phone Number" value={form?.Phone}  onChange={(e) =>{
                                           handlechange("Phone",e.target.value)
                                       }}/>
                                   </div>
                               </div>
                            </>
                        )}
                    </div>

                    <div className="row mt-4">
                        {form?.type === "General" && (
                            <>
                                <div className="row mt-3">
                                    <div className="col-md">
                                        <label htmlFor="Name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="Name" placeholder="Name" value={form?.Name} onChange={(e) =>{
                                            handlechange("Name",e.target.value)
                                        }} />
                                    </div>
                                    <div className="col-md">
                                        <label htmlFor="Lastname" className="form-label">Lastname</label>
                                        <input type="text" className="form-control" id="Lastname" placeholder="Lastname" value={form?.Lastname} onChange={(e) =>{
                                            handlechange("Lastname",e.target.value)
                                        }} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md">
                                        <label htmlFor="EmailC" className="form-label">Email Contact</label>
                                        <input type="email" className="form-control" id="EmailC" placeholder="EmailC" value={form?.EmailC} onChange={(e) =>{
                                        handlechange("EmailC",e.target.value)}
                                        } />
                                    </div>
                                    <div className="col-md">
                                        <label htmlFor="Phone" className="form-label">Phone</label>
                                        <input type="email" className="form-control" id="Phone" placeholder="Phone" value={form?.Phone} onChange={(e) =>{
                                            handlechange("Phone",e.target.value)}
                                        } />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <button type="submit" className="btn  btn-outline-primary mt-5" disabled={loading} onClick={submit}>Register</button>


                </div>
            </div>

        </div>
    )
}
export default RegisterEmployer
