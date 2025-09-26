import  react, {useState} from "react";

function  register(){


    return(
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <div className="card shadow-sm border-0 col-3" style={{maxWidth: "800px", width: "100%"}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login Employee</h3>
                    <form>
                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter yourname"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Lastname" className="form-label">Lastname</label>
                                <input type="text" className="form-control" id="Lastname" placeholder="Enter Lastname"/>
                            </div>
                        </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email"/>
                            </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="conform password" className="form-label">Conform Password</label>
                            <input type="password" className="form-control" id="conform password" placeholder="Enter Password"/>
                        </div>
                        <button type="submit" className="btn  btn-outline-primary">Register</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
export  default register