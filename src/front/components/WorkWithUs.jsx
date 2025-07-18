import React from "react";
import { Link } from "react-router-dom";

export const WorkWithUS = () => {

    return (

        <section className="text-white text-center py-5">
            <div className="container">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title mb-4">¿Por qué trabajar con nosotros?</h2>
                    <p className="text-white ct-description-p">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, illo ad iusto inventore quos quam numquam voluptate fugiat dolore unde repellat nobis aut eos debitis assumenda impedit incidunt sit maiores, voluptatum vel blanditiis recusandae! Unde, esse.
                    </p>

                    <div className="mt-5 align-items-center justify-content-center">
                        <Link className="btn btn-outline-yellow btn-lg rounded-pill px-5 w-50 d-none d-lg-block mx-auto " to="/contact">Conectemos ahora</Link>
                    </div>

                    <div className="row mt-5 pt-3">
                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">99</span>
                                <span className="text-stat-symbol">%</span>
                            </p>
                            <p className="title-sub text-white fw-semibold">Customer satisfaction</p>
                        </div>

                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">18</span>
                                <span className="text-stat-symbol">K</span>
                            </p>
                            <p className="title-sub text-white fw-semibold">Active users per year</p>
                        </div>

                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">+</span>
                                <span className="text-stat-symbol">10</span>
                            </p>
                            <p className="text-white fw-semibold">Completed projects</p>
                        </div>

                        <div className="col-12 mt-4">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">+</span>
                                <span className="text-stat-symbol">5</span>
                            </p>
                            <p className="text-white fw-semibold">years of experience</p>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <Link className="btn btn-outline-yellow btn-lg rounded-pill px-4 mx-auto d-lg-none w-100 w-lg-auto" to="/contact">Conectemos ahora</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};