import React from 'react';

const AboutUs = () => {
  return (
    <div className="container  my-5" id="aboutus" style={{"marginBottom": "300px"}}>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-equipo-creativo_114360-3894.jpg?w=2000&t=st=1694631605~exp=1694632205~hmac=9f415cfd8475fed46c92f650c6a3611a106efb5f6b3a196872d488eefcedb98b"
            alt="Illustration"
            style={{ width: '120%' }}
          />
        </div>
        <div className="col-md-6">
          <h1 style={{ fontSize: '3rem' }}> <strong> About  <span style={{"color":"#FD5812"}}>Us</span> </strong> </h1>
          <p>
            Componentify is your gateway to simplified web development. Born out of a collective passion for technology, our mission is clear: to provide developers of all levels with high-quality components and templates.
          </p>
          <p>
            We understand the frustration of searching for reliable resources. That's why we meticulously curate our offerings, ensuring they meet the highest standards of quality and usability. Our commitment to thorough documentation and easy integration empowers you to create unique web experiences effortlessly.
          </p>
          <p>
            Join us as we continue to shape the future of web development. Whether you're a seasoned pro or just starting out, Componentify is here to support your creative endeavors and simplify your web development process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
