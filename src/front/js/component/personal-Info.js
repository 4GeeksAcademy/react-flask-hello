import React from "react"
import "../../styles/personal-info.css"
import avatar from "../../img/avatar.png"


export const PersonalInfoProfile = () => {
    return (
        <div style={{ marginLeft: '150px', marginTop: '40px' }}>
            <div id="div-general" style={{ display: 'flex' }}>

                <div id="div1">
                    <div id="margin-card" style={{ marginLeft: '150px' }}>
                        <div className="card">
                            <img src={avatar} className="card-img-top" alt="profile photo" />
                            <div className="card-body">
                                <h5 className="card-title">Carlos Pinto</h5>
                                <p className="card-text">Active user</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div id="div2">
                    <div id="margin-card" style={{ marginLeft: '30px', marginTop: "40px" }}>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Nombre</span>
                            <input type="text" class="form-control" placeholder="Carlos" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Apellido</span>
                            <input type="text" class="form-control" placeholder="Pinto" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Email</span>
                            <input type="text" class="form-control" placeholder="carlos-pinto@mail.com" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Date</span>
                            <input type="text" class="form-control" placeholder="12/05/1990" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div className="col-md-10">
                            <label>Region</label>
                            <select
                                className="form-select m-2 p-2 ps-3"
                                name="region"

                            >
                                <option value="">Selecciona region...</option>
                                <option value={1}>I</option>
                                <option value={2}>II</option>
                                <option value={3}>III</option>
                                <option value={4}>IV</option>
                                <option value={5}>V</option>
                                <option value={6}>VI</option>
                                <option value={7}>VII</option>
                                <option value={8}>VIII</option>
                                <option value={9}>IX</option>
                                <option value={10}>X</option>
                                <option value={11}>XI</option>
                                <option value={12}>XII</option>
                                <option value={13}>XIII</option>
                                <option value={14}>XIV</option>
                                <option value={15}>XV</option>
                                <option value={16}>RM</option>
                            </select>
                        </div>
                        <br />
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Pasword</span>
                            <input type="text" class="form-control" placeholder="*******" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>



                        <div class="mb-3">
                            <label for="formFile" class="form-label">Change profile photo</label>
                            <input class="form-control" type="file" id="formFile" />
                        </div>

                        <button type="button" class="btn btn-dark">Save</button>



                    </div>
                </div>





            </div>

        </div>
    );
}