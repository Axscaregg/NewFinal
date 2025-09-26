function Login(){
    return(
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm border-0 text-bg-success col-3" style={{maxWidth: "450px", width: "100%"}}>
                <div className="card-body">
                    <h5 className="card-title">Easy for find job helper </h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content <br/>
                        TestProgramming
                    </p>


                </div>
            </div>
            <div className="card shadow-sm border-0 col-3" style={{maxWidth: "450px", width: "100%"}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login Employee</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password"/>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe"/>
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <a href="#" className="small text-decoration-none">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign In</button>
                    </form>
                    <div className="text-center mt-3">
                        <small>Not a member? <a href="/register">Register</a></small>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
//<label htmlFor="email " >Email Address</label>
//                     <input type="email" id="email" className="form-control col-3" placeholder="Enter Email"/>
//                     <label htmlFor="password " className="col-3 mt-5">Password</label>
//                     <input type="password" id="password" className="form-control col-3" placeholder="Enter Password"/>