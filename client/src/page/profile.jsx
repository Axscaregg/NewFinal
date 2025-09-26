import React ,{useState, useEffect}from "react"
import axios from "axios";
function profile(){
    const [gender,setgender] =useState("")
    const [name,setname] = useState("")
    const [Lname,setLname] = useState("")
    const [phone,setphone] = useState("")
    const [email,setemail] = useState("")
    const api = axios.create({
        baseURL: "http://localhost:5000/add",
        headers: { "Content-Type": "application/json" },
    })


    return(
        <div className="container-xxl mt-3 my-md4 ">
            <div className="row">
                <div className="col-lg-3 mb-4">

                                <div className="flex align-items-start">
                                    <div className="accordion  my-accordion w-75"  >
                                        <div className="accordion-item">
                                            <h2 c className="accordion-header">
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
                                                            The current button
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
                                    <label htmlFor="inputGender" className="form-label">Sex</label>
                                    <select id="inputGender" className="form-select">
                                        <option selected>Gender </option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="col-sm-9">

                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm">
                                <label id="email" className="form-label">email</label>
                                <input type="email" className="form-control" id="email" />
                            </div>
                            <div className="col-sm">
                                <label id="Phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="Phone" />
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                            <div className="col-sm-3">

                            </div>
                            <div className="col-sm-9">

                            </div>
                            </div>
                            <div className="row">
                                <div className="d-flex justify-content-center">
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

//     <div className="row">
//                 <div className="col-lg-3 mb-4">
//                     <div className="card shadow-sm">
//                         <div className="card-body">
//                             <p className="card-text">
//                                 <div className="d-flex align-items-start">
//                                     <div className="accordion">
//                                         <div className="accordion-item">
//                                             <h2 c className="accordion-header">
//                                                 <button className="accordion-button" type="button"
//                                                         data-bs-toggle="collapse"
//                                                         data-bs-target="#panelsStayOpen-collapseOne"
//                                                         aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
//                                                     Account
//                                                 </button>
//                                             </h2>
//                                             <div id="panelsStayOpen-collapseOne"
//                                                  className="accordion-collapse collapse show">
//                                                 <div className="accordion-body">
//                                                   <a href="#" type="button" className="btn btn-primary">Profile</a>
//                                                 </div>
//                                             </div>
//
//                                         </div>
//                                     </div>
//                                 </div>
//                             </p>
//                         </div>
//                     </div>
//                 </div>