import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AdminSearch = () => {
  const [component, setComponent] = useState({});
  const [search, setSearch] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [react, setReact] = useState("");

  const fetchComponentDelete = async (id) =>{
    try { 
        const response = await fetch(process.env.BACKEND_URL + "/api/component/delete/" + id,{method: "DELETE"})
        const data = await response.json();
        alert(data.results)

        if (data.response === 200) {
            alert("Component deleted successfully");
            // Limpia los campos después de la eliminación.
            setId("");
            setName("");
            setType("");
            setHtml("");
            setCss("");
            setJs("");
            setReact("");
          } else {
            alert("Failed to delete component");
          }

    } catch (error) {
        console.log(error)
    }

  }

  const fetchComponent = async (id) => {
    const response = await fetch(process.env.BACKEND_URL + "/api/component/" + id);
    const data = await response.json();
    setComponent(data.results);

    setId(data.results.id);
    setName(data.results.name);
    setType(data.results.type);
    setHtml(data.results.html_code);
    setCss(data.results.css_code);
    setJs(data.results.js_code);
    setReact(data.results.react_code);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "id":
        setId(value);
        break;
      case "name":
        setName(value);
        break;
      case "type":
        setType(value);
        break;
      case "html":
        setHtml(value);
        break;
      case "css":
        setCss(value);
        break;
      case "js":
        setJs(value);
        break;
      case "react":
        setReact(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="m-5 p-3 border border-4 border-warning rounded text-light bg-dark">
        <strong>Alert!</strong> This is a dangerous section that directly affects the database and is exclusively for administrators.
        <ul>
            <li><strong>C</strong>reate: fields need to be in blank to create a new component.</li>
            <li><strong>R</strong>ead: search by component id.</li>
            <li><strong>U</strong>pdate: search first, then update.</li>
            <li><strong>D</strong>elete: will delete the search id component.</li>

        </ul>
      </div>

      <form>
        <div className="">
          <label className="form-label me-2">
            <strong>#id to search</strong>
          </label>
          <input onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="btn btn-dark btn-sm ms-2 mb-1" onClick={(e) => { e.preventDefault(); fetchComponent(search); }}>
            Search component
          </button>
          <span className="ms-2">🍀</span>
        </div>
      </form>

      <form className="mt-2 shadow ps-4 pe-2 pt-4 pb-4 border-bottom border-4 border-warning">
        <div className="input-group mb-2">
          <div className="me-2">
            <div className="input-group-text">#id</div>
            <input
              type="text"
              className="form-control"
              name="id"
              value={id}
              onChange={handleInputChange}
            />
          </div>

          <div className="me-2">
            <div className="input-group-text">Name</div>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div className="me-2">
            <div className="input-group-text">Type</div>
            <input
              type="text"
              className="form-control"
              name="type"
              value={type}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-1 col-form-label">HTML</label>
          <div className="col-sm-11">
            <textarea
              className="form-control"
              rows="3"
              name="html"
              value={html}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-1 col-form-label">CSS</label>
          <div className="col-sm-11">
            <textarea
              className="form-control"
              rows="3"
              name="css"
              value={css}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-1 col-form-label">JS</label>
          <div className="col-sm-11">
            <textarea
              className="form-control"
              rows="3"
              name="js"
              value={js}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-1 col-form-label">REACT</label>
          <div className="col-sm-11">
            <textarea
              className="form-control"
              rows="3"
              name="react"
              value={react}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-success me-3">
          Add Component
        </button>
        <button className="btn btn-primary me-3">Check</button>
        <button className="btn btn-warning me-3">Modify</button>
        <button className="btn btn-danger me-3" onClick={(e) => { e.preventDefault(); fetchComponentDelete(id)}}>Delete</button>
      </form>
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