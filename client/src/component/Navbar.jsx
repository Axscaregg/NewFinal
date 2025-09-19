function Navbar(){
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
                            <ul className="navbar-nav d-md-none ">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Sign Up</a>
                                </li>
                            </ul>
                        </div>




                    </div>
                </div>
                <a href="#" className=" mt-1 ms-auto d-none d-md-inline-block">
                    Sign Up
                </a>
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