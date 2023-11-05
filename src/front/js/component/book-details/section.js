import React from "react"
import '../css/section.css'

export const Section = () => {
    return (
        <div className="div-general">

            <div id="div1">
                <div id="margin-card">
                    <div className="card">
                        <img src="portadaLibro.jpge" href='https://www.google.com/url?sa=i&url=https%3A%2F%2Fedit.org%2Fes%2Fportadas-libros&psig=AOvVaw0t3dyyCk93kTA57hfyuDhO&ust=1694223762388000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNCa573xmYEDFQAAAAAdAAAAABAE' className="card-img-top" alt="Book image" />
                        <div className="card-body">
                            <h5 className="card-title">Product name</h5>
                            <p className="card-text">$9.900</p>
                            <a href="#" className="btn btn-primary">Add cart</a>
                        </div>
                    </div>
                </div>


                <div >
                    <h1>Name book</h1>
                    <h2>Summary</h2>
                    <p id="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in sapien fringilla, auctor eros in, cursus enim.</p>
                    <h2>Print lenght</h2>
                    <p>110</p>
                    <h2>Lenguage</h2>
                    <p>Name idiom</p>
                    <h2>Author</h2>
                    <p>author name</p>
                    <h2>publisher</h2>
                    <p>4geeks editorial</p>
                    <h2>Owner</h2>
                    <p>Owner name</p>
                </div>

            </div>


            <div id="div2"></div>
        </div>
    );
}