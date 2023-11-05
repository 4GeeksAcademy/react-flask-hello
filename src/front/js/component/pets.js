import React from "react";
import { useEffect, useContext , useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css"


export const Pets = (props) => {
    const{ store, actions } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [currentPet, setPet] = useState({})

    function imgErrorHandler(e){
        //e.target.src = "https://cdn-icons-png.flaticon.com/512/8211/8211919.png" //Dog Paw stock image
        e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Shiba_inu_taiki.jpg/800px-Shiba_inu_taiki.jpg"
    }

    function createPet(){
        let newPet = {
            "name": document.getElementById('newPetNameInput').value, 
            "size":document.getElementById('newPetSizeInput').value, 
            "category": document.getElementById('newPetCategoryInput').value,
            "owner_id": "1"
        }
        console.log({newPet})
        actions.createPet(newPet)
    }

    function updatePet(){
        let updatedPet = {
            "id":currentPet.id.toString(), 
            "name": document.getElementById('nameInput').value, 
            "size":document.getElementById('sizeInput').value, 
            "category": document.getElementById('categoryInput').value,
            "owner_id": currentPet.owner_id.toString()
        }
        actions.updatePet(updatedPet)
    }

    useEffect(()=>{
        actions.getOwnerPets(1);
    },[]);
    return(
        <div className="text-left my-2">
            <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                <h2 style={{textAlign: "left", alignItems:"center"}}><strong>My pets</strong></h2>
                <button onClick={()=>setEdit(!edit)} className="btn btn-outline-dark">Edit</button>
            </div>
            {/* Lista de mascotas */}
            <ul className="p-0 d-flex flex-row flex-wrap justify-content-start align-items-center gap-4">
            {(store.pets.length < 1? "":store.pets.map((pet, index)=>{
            return (
                <div style={{width: "12rem"}} index={index}>
                    <div style={{borderRadius:"50%", width: "100%", height:"auto", overflow:"hidden", aspectRatio:"1"}}><img onError={imgErrorHandler}  src="..." className="card-img-top" alt="..." /></div>
                    <div className="card-body">
                        <h5 className="card-title">{pet.name}</h5>
                        <div className="card-text">
                            <p>{pet.category}<br />{pet.size}</p>
                        </div>
                        {/* Operacion ternaria para mostrar botones de editar */}
                        {(edit==false?"":<div className="d-flex flex-row justify-content-center gap-3">
                            <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editPet" onClick={()=>setPet(pet)}>Edit</button>
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="editPet" tabindex="-1" aria-labelledby="editPetLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="editPetLabel">Edit {currentPet.name}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    <div className="modal-body textLeft">
                                        {/* FORM BODY */}
                                        <form>
                                            <div class="mb-3">
                                                <label for="nameInput" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" defaultValue={currentPet.name}/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="sizeInput" class="form-label">Size</label>
                                                <select class="form-select" aria-label="Default select example" id="sizeInput" defaultValue={currentPet.size}>
                                                    {/* <option selected>{currentPet.size}</option> */}
                                                    <option value="Small">Small (1-8kg)</option>
                                                    <option value="Medium">Medium (8-20kg)</option>
                                                    <option value="Large">Large (20+kg)</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="categoryInput" class="form-label">Category</label>
                                                <input type="text" class="form-control" id="categoryInput" defaultValue={currentPet.category}/>
                                            </div>
                                        </form>
                                        {/* END OF FORM BODY */}
                                    </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" onClick={updatePet} className="btn btn-outline-success" data-bs-dismiss="modal">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Fin de modal */}

                            {/* <!-- Button trigger modal --> */}
                            <button type="button" onClick={()=>setPet(pet)} className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Remove {currentPet.name}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    <div className="modal-body">
                                        Are you sure you want to remove {currentPet.name} from your profile?
                                    </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                                            <button type="button" onClick={()=>actions.deletePet(currentPet)} className="btn btn-outline-danger" data-bs-dismiss="modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Fin de modal */}
                        </div>)}
                        {/* Fin de botones de editar */}
                    </div>
                </div>
                );
            }))}
                <div className="px-4">
                    <div className="d-flex flex-column align-items-center text-center gap-4">
                        <button className="btn btn-outline-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#addPet" style={{aspectRatio:"1", width:"5rem", height:"5rem", fontSize:"42px", paddingTop:"0"}}>+</button>
                        <h5><strong>Add pet</strong></h5>
                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="addPet" tabindex="-1" aria-labelledby="addPetLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="addPetLabel">Add pet</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                    <div className="modal-body textLeft">
                                        {/* FORM BODY */}
                                        <form>
                                            <div class="mb-3">
                                                <label for="newPetNameInput" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="newPetNameInput" aria-describedby="nameHelp"/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="newPetSizeInput" class="form-label">Size</label>
                                                <select class="form-select" aria-label="Size by kilograms" id="newPetSizeInput">
                                                    {/* <option selected>{currentPet.size}</option> */}
                                                    <option value="Small">Small (1-8kg)</option>
                                                    <option value="Medium">Medium (8-20kg)</option>
                                                    <option value="Large">Large (20+kg)</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="newPetCategoryInput" class="form-label">Category</label>
                                                <input type="text" class="form-control" id="newPetCategoryInput"/>
                                            </div>
                                        </form>
                                        {/* END OF FORM BODY */}
                                    </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" onClick={createPet} className="btn btn-outline-success" data-bs-dismiss="modal">Add pet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Fin de modal */}
                    </div>
                </div>
            </ul>
        </div>
    );
}