import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";





export const ResetPassword = () => {
    // 1)We take the object from the URL and parse it to get the token
    const location = useLocation(); //==> it gives you an object describing the current URL your user is on and it contains information about the current URL, including the pathname, search, and hash.
    const queryParams = new URLSearchParams(location.search) //==>Parse the query string in the URL into a map-like object
    const token = queryParams.get("token") //==>either the token string or null
    const navigate = useNavigate(); //==> It allows you to programmatically navigate to different routes in your application. It is a hook that returns a function that can be used to navigate to a different route.

    // 2) We create a state to store the new password and confirm password and show an error message if the passwords do not match.
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); //==> We create a loading state to show a loading spinner when the user clicks the submit button and the API is being called.


    // 3) We create a function to handle the form submission in the form.
    // const handleSubmit = async (e) => {//==> asynchronous function that will be called when the user clicks the submit button
    //     e.preventDefault(); //==> Prevent the default behavior of the form submission when the user clicks the submit button(refreshing the page)
    //     setError(null); //==> Reset the error message to null when the user clicks the submit button
    //     if (newPassword !== confirmPassword) { //==> Check if the new password and confirm password are not equal
    //         setError("Passwords do not match")
    //         return; //==> early exit the function stopping the execution of the code below. so the coode don't call the API on the backend.
    //     }

    //     setLoading(true); //==> Set the loading state to true when the user clicks the submit button

    //     //==> We create a payload object to send to the backend with the token and the new password
    //     // const payload = {
    //     //     token: token,
    //     //     new_password: newPassword
    //     // // }
    //     // console.log("======>>>>!!Payload going to server:>>>", payload);
    //     console.log("=====>>>>!!!PAYLOAD:>>>>", JSON.stringify({ token, new_password: newPassword }));
    //     // 4) Call the API to reset the password
    //     console.log("🍃 VITE_BACKEND_URL is:", import.meta.env.VITE_BACKEND_URL);

    //     try {
    //         const callResetPassword = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`,
    //             {
    //                 method: "PUT", //==> We use the PUT method to update the password.
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({ token, new_password: newPassword }) //==> We send the payload object to the backend
    //             })
    //         console.log("BACKEND:", import.meta.env.VITE_BACKEND_URL);

    //         const body = await callResetPassword.json().catch(()=>{})
    //         if (!callResetPassword.ok) {
    //             const errMsg = body.error || "Something went wrong. Please try again.";
    //             setError(errMsg)
    //             return; //==> early exit the function stopping the execution of the code below.
    //         }

    //         console.log("==>>>Server said:", body);

    //         alert("Password successfully changed")
    //         navigate("/signin", { replace: true }) //==> If the API call is successful, we navigate to the sign in page // It swaps the history entry so users can’t hit “Back” and re-submit the form.
    //     }

    //     // catch (err) {
    //     //     setError(err.message || "Unknown Error") //==> If the API call fails, we set the error message to the error message returned by the API or to "Unknown Error" if no error message is returned.
    //     //      console.log(err.message);

    //     // }
    //     // finally { //==> This block of code will always be executed after the try and catch blocks, regardless of whether an error occurred or not.
    //     //     setLoading(false) //==> Set the loading state to false when the API call is finished
    //     // }

    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        // 🔥 Bring payload back
        const payload = { token, new_password: newPassword };

        console.log("Payload going to server:", payload);
        console.log("VITE_BACKEND_URL is:", import.meta.env.VITE_BACKEND_URL);

        try {
            const res = await fetch(
                console.log(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`)
                ,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            // parse before checking ok
            const json = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(json.error || "Something went wrong. Please try again.");
                return;
            }

            console.log("Server response:", json);
            alert("Password successfully changed");
            navigate("/signin", { replace: true });
        } catch (networkError) {
            console.error(networkError);
            setError(networkError.message || "Network error");
        } finally {
            setLoading(false);
        }
    };



    return (

        <div className="container justify-content-center d-flex flex-column  vh-100 align-items-center">
            {/* 100vh means “100% of the viewport’s height.” min-height ensures the container can grow taller if its content overflows. */}
            {!token ? (<p style={{ color: "red", marginTop: "0.5rem" }}>
                Invalid link.
                <a href="/password">Request a new reset email</a>
            </p>) :
                (
                    <>
                        <h2 className="display-6 text-primary text-center mb-4">
                            <i className="bi bi-lock-fill me-2"></i>
                            Reset your password
                        </h2>
                        <div
                            className="card shadow-sm"
                            style={{ maxWidth: "400px", width: "100%" }}>
                            <div className="card-body">
                                <form className=" d-flex flex-column gap-3" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">New password:</label>
                                        <input
                                            className="form-control"
                                            id="password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                                        <input
                                            className="form-control"
                                            id="confirm-password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">{loading ? "Saving..." : "Save new password"}</button>
                                    {error && (<div className="alert alert-danger mt-3">
                                        {error}
                                    </div>)}
                                </form>
                            </div>

                        </div>

                    </>
                )}
        </div>
    );

}