import  react, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registers} from "../api/auth.js";

function  register(){
        const [form,setform] = useState({})
        const [loading,setloading] = useState(false)

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
              if (form.password !== form.cfpass) {
                  seterror("Passwords do not match");
                  setloading(false);
                  return;
              }
            const res=  await registers(form.email, form.password,form.name,form.lastname)
                    console.log(res)
                    navigate("/login");

          }  catch (e){
              console.log(e)
          } finally {
              setloading(false)

          }
    }

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <div className="card shadow-sm border-0 col-3" style={{maxWidth: "800px", width: "100%"}}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login Employee</h3>

                        <div className="mb-3 row">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter yourname" value={form?.name}  onChange={(e) =>{
                                    handlechange("name",e.target.value)
                                }}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="Lastname" className="form-label">Lastname</label>
                                <input type="text" className="form-control" id="Lastname" placeholder="Enter Lastname" value={form?.lastname} onChange={(e) =>{
                                    handlechange("lastname",e.target.value)
                                }}/>
                            </div>
                        </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email" value={form?.email} onChange={(e) =>{
                                    handlechange("email",e.target.value)
                                }}/>
                            </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" value={form?.password} onChange={(e) =>{
                                handlechange("password",e.target.value)
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cfpass" className="form-label">Conform Password</label>
                            <input type="password" className="form-control" id="cfpass" placeholder="Enter Password" value={form?.cfpass} onChange={(e)=>{
                                handlechange("cfpass", e.target.value)
                            }}/>
                        </div>
                        <button type="submit" className="btn  btn-outline-primary" disabled={loading} onClick={submit}>Register</button>


                </div>
            </div>
        </div>
    )
}
export  default register