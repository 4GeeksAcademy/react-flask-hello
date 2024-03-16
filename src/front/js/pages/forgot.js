import React, { useState, useEffect, useContext } from "react"
import { Context } from "../store/appContext"
import { Link } from "react-router-dom"


export const Forgot = () => {
    const { actions } = useContext(Context)
    const [newPassword, setNewPassword] = useState("")
    const [confirm,setConfirm]=useState("")

    const save1=(e)=>{
        setNewPassword(e.target.value)
    }
    const save2=(e)=>{
        setConfirm(e.target.value)
    }


    const handleForgot = (e)=>{
        e.preventdefault()
        if(newPassword==confirm){
            console.log("confirmado")
        }
        else{
            console.log("no")
        }

    }


    return (
        <>
            <form onSubmit={handleForgot}>
                <div>
                    <h1>Forgot Password</h1>
                    <p>Please, insert a new Password </p>
                </div>

               <div className="mb-3">
                    <label htmlFor="Save1" className="form-label">New Password</label>
                    <div className="input-group">
                        <input placeholder="**********" 
                         type="password"
                         className="form-control"
                         id="Save1"
                         name="newPassword"
                         value={newPassword} 
                         onChange={save1}/>
                        <div className="input-group-text"><i className="fa fa-eye"></i></div>
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="Save2" className="form-label">
                        Write the new password to confirm</label>
                    <div className="input-group">
                        <input placeholder="**********" type="password"
                         className="form-control" id="Save2"
                         value={confirm}
                         name="confirm" 
                         onChange={save2}/>
                        <div className="input-group-text"><i className="fa fa-eye"></i></div>
                    </div>
                </div>

                
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success">Restore</button>
                </div>
            </form>
        </>
    )



}
