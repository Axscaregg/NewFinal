import React ,{useState}from "react"
import api from "../api/axios.js";
import {setAccessToken} from "../api/axios.js";

function profile(){
    const [form,setform] = useState({})
    const [loading,setloading] = useState(false)
    const COUNTRIES = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
        "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
        "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
        "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
        "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia",
        "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
        "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
        "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
        "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
        "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
        "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
        "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
        "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
        "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
        "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
        "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
        "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
        "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
        "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
        "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
        "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
        "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
        "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
        "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
    const RELIGIONS = [
        "Buddhism",
        "Christianity",
        "Islam",
        "Hinduism",
        "Sikhism",
        "Judaism",
        "Atheist",
        "Agnostic",
        "Other"
    ];
    const [error,seterror] = useState("")
    const handlechange = (name,value) =>{
        setform((prev) =>{
            return{...prev,[name]:value}
        })
    }
    const id = localStorage.getItem("user")

    const storageObject = JSON.parse(id)
    const submit = async () =>{
        setloading(true)
        seterror("");

        try {

            const res = await api.post("/profile/upsert",{
                id: storageObject.id,
                name:form?.name,
                Lname: form?.Lname,
                gender: form?.gender,
                date: form?.date,
                contry: form?.contry,
                nation: form?.nation,
                weight: form?.weight,
                height: form?.height,
                phone: form?.phone,
                lineid: form?.lineid

            })
            console.log("Success")
        }catch (error){
        console.error("Error input",error)
            seterror("An unexpected error occurred. Please try again.");
        }finally {
            setloading(false)
        }
    }
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
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm">
                                    <label id="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={form?.name} onChange={(e)=>{
                                        handlechange("name",e.target.value)
                                    }}/>
                                </div>
                                <div className="col-sm">
                                    <label id="Lname" className="form-label">Lastname</label>
                                    <input type="text" className="form-control" id="Lname" value={form?.Lname} onChange={(e)=>{
                                        handlechange("Lname",e.target.value)
                                    }} />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="inputGender" className="form-label">Gender</label>
                                    <select id="inputGender" className="form-select" value={form?.gender} onChange={(e)=>{
                                        handlechange("gender",e.target.value)
                                    }}>
                                        <option  value="male">Male</option>
                                        <option  value="female">Female</option>
                                    </select>
                                </div>
                                <div className="col-sm-5">
                                    <label htmlFor="startDate" className="pb-2">Birthday</label>
                                    <input id="startDate" className="form-control" type="date" value={form?.date} onChange={(e)=>{
                                        handlechange("date",e.target.value)
                                    }}/>
                                </div>
                                <div className="col-sm-3">
                                    <label htmlFor="nation" className="form-label">Nation</label>
                                    <select id="inputnation" className="form-select" value={form?.contry} onChange={(e)=>{
                                        handlechange("contry",e.target.value)
                                    }}>
                                        <option value="">Select
                                        </option>{COUNTRIES.map((contry)=>(
                                            <option key={contry} value={contry}>
                                                {contry}
                                            </option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="nation" className="form-label">RELIGIONS</label>
                                <select id="inputnation" className="form-select" value={form?.nation} onChange={(e)=>{
                                    handlechange("nation",e.target.value)
                                }}>
                                    <option value="">Select
                                    </option>{RELIGIONS.map((nation)=>(
                                    <option key={nation} value={nation}>{nation}</option>
                                ))}
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label id="Weight" className="form-label">Weight</label>
                                <input type="text" className="form-control" id="Weight"  placeholder="Kg" value={form?.weight} onChange={(e)=>{
                                    handlechange("weight",e.target.value)
                                }}/>
                            </div>
                                <div className="col-sm-3">
                                    <label id="Height" className="form-label">Height</label>
                                    <input type="text" className="form-control" id="Weight"  placeholder="cm" value={form?.height} onChange={(e)=>{
                                        handlechange("height",e.target.value)
                                    }}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                 <div className="col-sm-3">
                                    <label id="Phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="Phone" value={form?.phone} onChange={(e)=>{
                                        handlechange("phone",e.target.value)
                                    }}/>
                                 </div>
                                 <div className="col-sm-5">
                                        <label id="Lineid" className="form-label">Line id</label>
                                        <input type="text" className="form-control" id="lineid" value={form?.Lineid} onChange={(e)=>{
                                            handlechange("lineid",e.target.value)
                                        }} />
                                 </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary " disabled={loading} onClick={submit}>Save</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default profile
