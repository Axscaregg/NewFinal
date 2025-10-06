import React ,{useState, useEffect}from "react"
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";

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
    const handlechange = (name,value) =>{
        setform((prev) =>{
            return{...prev,[name]:value}
        })
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
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="col-sm">
                                    <label id="Lname" className="form-label">Lastname</label>
                                    <input type="text" className="form-control" id="Lname" />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="inputGender" className="form-label">Gender</label>
                                    <select id="inputGender" className="form-select">
                                        <option selected>Male</option>
                                        <option selected>Female</option>
                                    </select>
                                </div>
                                <div className="col-sm-5">
                                    <label htmlFor="startDate" className="pb-2">Birthday</label>
                                    <input id="startDate" className="form-control" type="date"/>
                                </div>
                                <div className="col-sm-3">
                                    <label htmlFor="nation" className="form-label">Nation</label>
                                    <select id="inputnation" className="form-select">
                                        <option value="">Select
                                        </option>{COUNTRIES.map((contry)=>(
                                            <option key={contry} valผue={contry}>{contry}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="nation" className="form-label">RELIGIONS</label>
                                <select id="inputnation" className="form-select">
                                    <option value="">Select
                                    </option>{RELIGIONS.map((contry)=>(
                                    <option key={contry} value={contry}>{contry}</option>
                                ))}
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label id="Weight" className="form-label">Weight</label>
                                <input type="text" className="form-control" id="Weight"  placeholder="Kg"/>
                            </div>
                                <div className="col-sm-3">
                                    <label id="Height" className="form-label">Height</label>
                                    <input type="text" className="form-control" id="Weight"  placeholder="cm"/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                 <div className="col-sm-3">
                                    <label id="Phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="Phone" />
                                 </div>
                                 <div className="col-sm-5">
                                        <label id="Lineid" className="form-label">Line id</label>
                                        <input type="text" className="form-control" id="Lineid" />
                                 </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-center mt-4">
                                    <button type="submit" className="btn btn-primary ">Save</button>
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
