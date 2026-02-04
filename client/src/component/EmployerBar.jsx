import React from "react";

function EmployerBar(){
    return (
        <div className="col-xxl mb-4">

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
                                    <a className="list-group-item list-group-item-action " role="button" aria-current="true" href="">
                                        Employer-Profile
                                    </a>
                                    <div className="my-2"></div>
                                    <button type="button"
                                            className="list-group-item list-group-item-action "
                                            aria-current="true">
                                        PostJob
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default  EmployerBar