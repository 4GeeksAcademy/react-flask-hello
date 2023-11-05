import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Admin = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      const response = await fetch(process.env.BACKEND_URL + "/api/components");
      const data = await response.json();
      setComponents(data.results);
    };

    fetchComponents();
  }, []);

  return (
    <div className="container">
    
    <div className="m-5 p-3 border border-4 border-warning rounded text-light bg-dark">        
    <strong>Alert!</strong> This is a dangerous section that directly affects the database and is exclusively for administrators.
        </div>

    {components.map(component => (
        <form className="mt-5 shadow ps-4 pe-2 pt-4 pb-4 border-bottom border-4 border-warning">
            

            <div className="input-group mb-2">
                <div className="me-2">
                <div className="input-group-text ">#id</div>
                <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={component.id}/>
                </div>

                <div className="me-2">
                <div className="input-group-text">Name</div>
                <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={component.name}/>
                </div>

                <div className="me-2">
                <div className="input-group-text">Type</div>
                <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={component.type}/>
                </div>
                 
            </div>


            <div className="row mb-3">
                <label className="col-sm-1 col-form-label">HTML</label>
                    <div className="col-sm-11">
                         <textarea className="form-control" id="exampleTextarea" rows="3" value={component.html_code}> </textarea>
                    </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-1 col-form-label">CSS</label>
                    <div className="col-sm-11">
                         <textarea className="form-control" id="exampleTextarea" rows="3" value={component.css_code}> </textarea>
                    </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-1 col-form-label">JS</label>
                    <div className="col-sm-11">
                         <textarea className="form-control" id="exampleTextarea" rows="3" value={component.js_code}> </textarea>
                    </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-1 col-form-label">REACT</label>
                    <div className="col-sm-11">
                         <textarea className="form-control" id="exampleTextarea" rows="3" value={component.react_code}> </textarea>
                    </div>
            </div>



            <button type="submit" className="btn btn-primary me-3">Submit</button>
            <button className="btn btn-secondary me-3">Check</button>
            <button className="btn btn-warning me-3">Modify</button>
            <button className="btn btn-danger me-3">Delete</button>
            
        </form>

    

        
    ))}


    </div>
  );
};


{/* <div className="container">
{components.map(component => (
    <div key={component.id}>
        {component.id} - {component.type} - {component.name}        
        {component.type} 
        <code>{component.html_code}</code>
        <code>{component.css_code}</code>
        <code>{component.js_code}</code>
        <code>{component.react_code}</code>   
    </div>
))
}
</div> */}