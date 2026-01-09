import {useState,useEffect} from "react";
import api from "../api/axios.js";
import {useNavigate} from "react-router-dom";
import {login} from "../api/auth.js";
import {setAccessToken} from "../api/axios.js";


function Login(){
    const [form,setform] = useState({})
    const [loading,setloading] = useState(false)
    const [error,seterror] = useState("")
    const navigate = useNavigate();

    // useEffect(()=>{
    //     (async ()=>{
    //         try {
    //             const {data} = await  api.get("/profile/me")
    //             if(data) {
    //                 navigate("/profile")
    //             }
    //         }catch (e){
    //             console.error(e)
    //             seterror("Error Get Profile")
    //         }
    //     })()
    // },[])

    const handlechange = (email,values) =>{
        setform((prev)=>{
            return {...prev,[email]:values}
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        setloading(true);
        seterror("");

        try {
            const result = await login(form.email, form.password)
            localStorage.setItem("user", JSON.stringify(result));
            if (result.role === "employer") {
                navigate("/employer_user");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Login error:", error);
            seterror("An unexpected error occurred. Please try again.");
        } finally {
            setloading(false);
        }
    };

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
                    <h3 className="card-title text-center mb-4">Login</h3>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" value={form?.email} onChange={(e)=>{
                                handlechange("email",e.target.value)
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={form?.password} onChange={(e) =>{
                                handlechange("password",e.target.value)
                            }}/>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe"/>
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <a href="#" className="small text-decoration-none">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" onClick={submit}>Sign In</button>

                    <div className="text-center mt-3">
                        <small>Not a member? <a href="/register">Register</a></small>
                    </div>
                    <div className="text-center mt-3">
                        <small>Or login for post job  <a href="/RegisterEm">Register</a> </small>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
