import React from "react";
import "../../styles/global.css"
import "./global.js"
import { SideBar } from "../component/sideBar";

const AlertsView = () => {

    return (
        <div className="container">
            <h1 className="mt-5">Alerts</h1>
            <p className="fs-5 mt-2 mb-3">The <span style={{ "color": "#FD5812" }}>c-alert component</span> is used to convey important information to the user through the use of contextual types, icons, and colors.</p>
            <div className="row">

                <SideBar/>

                <div className="col-4">
                    <div className="border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">

                        {/* CODIGO VISUAL DE LAS ALERTS */}

                        <div class="c-alert c-alert-dark" role="alert">
                            This is a dark alert!
                        </div>
                        <div class="c-alert c-alert-slate" role="alert">
                            This is a slate alert!
                        </div>
                        <div class="c-alert c-alert-gloomy" role="alert">
                            This is a gloomy alert!
                        </div>
                        <div class="c-alert c-alert-silver" role="alert">
                            This is a silver alert!
                        </div>
                        <div class="c-alert c-alert-risk" role="alert">
                            This is a risk alert!
                        </div>
                        <div class="c-alert c-alert-caution" role="alert">
                            This is a caution alert!
                        </div>
                        <div class="c-alert c-alert-gold" role="alert">
                            This is a golden alert!
                        </div>
                        <div class="c-alert c-alert-lime" role="alert">
                            This is a lime alert!
                        </div>
                        <div class="c-alert c-alert-mint" role="alert">
                            This is a mint alert!
                        </div>
                        <div class="c-alert c-alert-win" role="alert">
                            This is a win alert!
                        </div>
                        <div class="c-alert c-alert-azure" role="alert">
                            This is an azure alert!
                        </div>
                        <div class="c-alert c-alert-aqua" role="alert">
                            This is an aqua alert!
                        </div>

                        <div class="c-alert c-alert-lavender" role="alert">
                            This is a lavender alert!
                        </div>
                        <div class="c-alert c-alert-purple" role="alert">
                            This is a purple alert!
                        </div>
                        <div class="c-alert c-alert-lollypop" role="alert">
                            This is a lollypop alert!
                        </div>
                        <div class="c-alert c-alert-fog" role="alert">
                            This is a foggy alert!
                        </div>
                        <div class="c-alert c-alert-componentify" role="alert">
                            This is a componentify alert!
                        </div>
                        <div class="c-alert c-alert-mocca" role="alert">
                            This is a mocca alert!
                        </div>
                    </div>

                </div>

                {/* COMIENZA CODIGO CRUDO DE LAS ALERTS */}

                <div className="col-6">
                    <div className="container border border-secondary-subtle px-4 py-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">


                        <div class="c-alert c-alert-dark" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-dark" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-slate" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-slate" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-gloomy" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-gloomy" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-silver" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-silver" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-risk" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-risk" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-caution" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-caution" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-gold" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-gold" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-lime" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-lime" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-mint" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-mint" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-win" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-win" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-azure" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-azure" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-aqua" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-aqua" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-lavender" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-lavender" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-purple" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-purple" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-lollypop" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-lollypop" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-fog" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-fog" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-componentify" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-componentify" role="alert">`} </code>
                            </pre>
                        </div>


                        <div class="c-alert c-alert-mocca" role="alert" style={{ height: "58px" }}>
                            <pre>
                                <code>{`<div class="c-alert c-alert-mocca" role="alert">`} </code>
                            </pre>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}



export default AlertsView;