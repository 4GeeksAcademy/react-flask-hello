import React, { useEffect, useState } from "react"

export const LoginPage = () => {
    return(
        <div>
            <div>
                <h1 className="main">Welcome to Couch Potato!</h1>
                <h3>Login to your Account </h3>
                <label>Enter your Email</label>
                <input onChange={(e) => setName(e.target.value)} value={email} type="text" placeholder="email" />
            </div>
        
            <div>
                <label>Enter your Password </label>
                <input onChange={(e) => setName(e.target.value)} value={password} type="text" placeholder="password" />

                <button>Login!</button>
            </div>
        </div>
    )
}