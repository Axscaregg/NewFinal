import {useState,useEffect} from "react";
import {logout} from "../api/auth.js";
import {useNavigate} from "react-router-dom";
function Navbar(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {

        const load = () => {
            const u = localStorage.getItem("user");
            setUser(u ? JSON.parse(u) : null);
        };
        load();

        const onStorage = (e) => {
            if (e.key === "user") {
               load()
            }
        };
        window.addEventListener("userchange", load);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener("userchange", load);
            window.removeEventListener("storage", onStorage);
        }
    }, []);

    const doLogout = async () => {
        await logout();
        setUser(null);
        window.dispatchEvent(new Event("userchange"));
        navigate("/")
    };
    return(
        <nav className="navbar navbar-expand-md navbar-custom flex-wrap flex-lg-nowrap ">
            <div className="container-lg">
                <a className="navbar-brand " href="/home">Main </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="navbar-nav  ">
                            <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            <a className="nav-link" href="#">Test</a>
                            <a className="nav-link" href="#">2</a>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>

                            <ul className="navbar-nav d-md-none ">

                                {!user ? (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Sign in</a>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                                {user.email}
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><button className="dropdown-item" onClick={doLogout}>Logout</button></li>
                                            </ul>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>


                    </div>
                </div>
                <div className="ms-auto d-none d-md-inline-block">
                    {!user ? (
                        <a href="/login" className="mt-1">Sign in</a>
                    ) : (
                        <div className="dropdown">
                            <button className="btn bg-light border dropdown-toggle rounded-pill px-3 py-1"
                                    data-bs-toggle="dropdown">
                <span className="me-2 badge rounded-circle bg-secondary">
                  {String(user.email).charAt(0).toUpperCase()}
                </span>
                                {user.email}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={doLogout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
// <nav className="navbar navbar-expand-md navbar-custom flex-wrap flex-lg-nowrap ">
//             <div className="container-lg">
//                 <a className="navbar-brand " href="/home">Main </a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
//                         data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
//                         aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse  " id="navbarNavAltMarkup">
//                     <div className="navbar-nav  ">
//                         <a className="nav-link active" aria-current="page" href="/home">Home</a>
//                         <a className="nav-link" href="#">Test</a>
//                         <a className="nav-link" href="#">2</a>
//                     </div>
//                     <a href="#" className=" ms-auto d-none d-md-inline-block">
//                         Sign Up
//                     </a>
//
//
//                     <ul className="navbar-nav d-md-none ">
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Sign Up</a>
//                         </li>
//                     </ul>
//                 </div>
//
//             </div>
//         </nav>