import React, { useEffect, useState } from "react"

export const SecondaryPage = () => {
    return(
        <div>
            <h1>Reset Your Password</h1>
            <div>
                <label>Enter your new password</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="full name" />
            </div>
        </div>
    )
}