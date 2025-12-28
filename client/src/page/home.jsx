
function home(){
    return(
       <div className="container-xxl mt-5  justify-content-center align-items-center text-center">
           <div className="row">
               <p className="fs-3 fw-bold text-start" >Test</p>
               <div className="col-lg ms-auto ">
                    <div className="card" style={{width:'18rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Test</p>
                        </div>
                    </div>
               </div>
               <div className="col-lg  ms-auto ">
                   <div className="card" style={{width:'18rem'}}>
                       <div className="card-body">
                           <h5 className="card-title">Card title</h5>
                           <p className="card-text">Test</p>
                       </div>
                   </div>
               </div>
               <div className="col-lg  ms-auto ">
                   <div className="card" style={{width:'18rem'}}>
                       <div className="card-body">
                           <h5 className="card-title">Card title</h5>
                           <p className="card-text">Test</p>
                       </div>
                   </div>
               </div>
           </div>
           <div className="container bg-dark">
               <div id="carouselExampleIndicators" className="carousel slide mt-5">
                   <div className="carousel-indicators">
                       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                               className="active bg-danger" aria-current="true" aria-label="Slide 1"></button>
                       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="bg-danger"
                               aria-label="Slide 2"></button>
                       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className="bg-danger"
                               aria-label="Slide 3"></button>
                   </div>
                   <div className="carousel-inner">
                       <div className="carousel-item active">
                           <div className="card" style={{width: '18rem'}}>
                               <div className="card-body">
                                   <h5 className="card-title">Card title</h5>
                                   <p className="card-text">Test1</p>
                               </div>
                           </div>
                       </div>
                       <div className="carousel-item">
                           <div className="card" style={{width: '18rem'}}>
                               <div className="card-body">
                                   <h5 className="card-title">Card title</h5>
                                   <p className="card-text">Test2</p>
                               </div>
                           </div>
                       </div>
                       <div className="carousel-item">
                           <div className="card" style={{width: '18rem'}}>
                               <div className="card-body">
                                   <h5 className="card-title">Card title</h5>
                                   <p className="card-text">Test3</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                           data-bs-slide="prev">
                       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                       <span className="visually-hidden">Previous</span>
                   </button>
                   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                           data-bs-slide="next">
                       <span className="carousel-control-next-icon" aria-hidden="true"></span>
                       <span className="visually-hidden">Next</span>
                   </button>
               </div>
           </div>
       </div>
    )

}

export default home