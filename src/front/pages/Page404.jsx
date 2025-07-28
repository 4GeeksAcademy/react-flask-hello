import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
 return (<section className="page_404">
  <div className="container">
    <h1>404</h1>
    <h2>Oops, Page Not Found</h2>
    <p>Page that you're looking for isn't found</p>
    <Link to="/" className="btn">Go to Home</Link>
    {/* <button className="btn">Go Back</button> */}
  </div>
  <style>{`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Sora", sans-serif;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #22b455, #1dd1a1);
}
.page_404 {
  padding: 9vh;
}
.container {
  min-width: 100vh;
  min-height: 80vh;
  border-radius: 50px;
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 12px 12px 23px #bebebe, -12px -12px 23px #fff;
  text-align: center;
}
.container h1 {
  font-size: 10rem;
  background: linear-gradient(45deg, #22b455, #1dd1a1) center;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 750;
}
.container h2 {
  padding: 9vh 0 0 0;
  color: #204829;
  margin-top: 15rem;
  margin-bottom: 10px;
}
.container p {
  color: #204829;
  font-weight: 450;
  margin: 10px;
}
.container .btn {
  padding: 12px 24px;
  border-radius: 50px;
  border: none;
  background: linear-gradient(to left, #22b455, #1dd1a1, #22b455);
  background-size: 200%;
  color: white;
  cursor: pointer;
  transition: 0.3s linear;
}
.container .btn:hover {
  background-position: right;
}
`}</style>
</section>);}