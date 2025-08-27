import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useRef, useState } from "react";

export const NewTask = () => {
    // Access the global state and dispatch function using the useGlobalReducer hook.
    const { store, dispatch } = useGlobalReducer()

    const [task, setTask] = useState({
        "title": "",
        "description": "",
        "location": "",
        "price": "",
        "due_at": "",
        "status": "open",
        "posted_at": "",
        "assigned_at": "",
        "completed_at": "",
        "categories": ""
    })

    const [categories, setCategories] = useState("Selecciona la categoría de tu tarea")
    const [catList, setCatList] = useState([
        { name: "General/Social", checked: false },
        { name: "Mascotas", checked: false },
        { name: "Shopping", checked: false },
        { name: "Jardín", checked: false },
        { name: "Muebles", checked: false },
    ])
    const categoriesCheck = (categoryName) => {
        const prevCatList = [...catList]
        const updatedList = prevCatList.map(category =>
            category.name === categoryName
                ? { ...category, checked: !category.checked }
                : category
        );
        setCatList(updatedList);

        // Crear array con los nombres de categorías checked=true
        const checkedCategories = updatedList
            .filter(category => category.checked)
            .map(category => category.name);

        console.log("Categorías seleccionadas:", checkedCategories);
        setCategories(checkedCategories)
    };

    const addTask = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const postTask = await fetch("https://sturdy-adventure-q79vjr6rwwgp2jxp-5000.app.github.dev/api/tasks", {
          method: 'POST',
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' }
        })
        console.log(postTask)
        
      } catch (error) {
        console.log(error)
      }
    }
  }
    return (
        <div className="container">
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
            <div className="text-center">
                <h1>Publica una nueva tarea</h1>
            </div>
            <form className="border rounded-5 bg-light col-12 p-5" onSubmit={(e) => addTask()}>

                <div className="mb-3">
                    <label htmlFor="task-title" className="form-label">¿Qué necesita hacerse?</label>
                    <input type="text" className="form-control" id="task-title" placeholder="Escribe un título llamativo para tu tarea" onChange={(e) => setTask({ ...task, title: e.target.value })} value={task.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">¿Cuándo?</label>
                    <input type="date" className="form-control" id="deadline" onChange={(e) => setTask({ ...task, due_at: e.target.value })} value={task.due_at} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">¿Dónde?</label>
                    <input type="text" className="form-control" id="location" placeholder="Ciudad" onChange={(e) => setTask({ ...task, location: e.target.value })} value={task.location} />

                </div>
                <div className="mb-3">
                    <label htmlFor="budget" className="form-label">¿Cuál es tu presupuesto?</label>
                    <input type="number" className="form-control" id="budget" onChange={(e) => setTask({ ...task, price: e.target.value })} value={task.price} />
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingTextarea2">Detalles de la tarea</label>
                    <textarea className="form-control" rows="3" placeholder="Escribe los detalles de la tarea a resolver" id="floatingTextarea2" onChange={(e) => setTask({ ...task, description: e.target.value })} value={task.description}></textarea>
                </div>

                <div className="dropdown">

                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {categories}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {catList.map((cat, index) => (
                            <li className="dropdown-item" key= {index}>
                                <input type="checkbox" className="form-check-input" checked={cat.checked} id="general-cat" />
                                <label className="form-check-label mx-2" htmlFor="general-cat" onClick={() => categoriesCheck(cat.name)} >{cat.name}</label>
                            </li>
                        ))

                        }
                    </ul>
                </div>
                <div className="my-3">
                    <label className="form-check-label my-2" htmlFor="fotos">Sube algunas fotos que ayuden a entender la tarea</label>
                    <input type="file" className="form-control" id="fotos" multiple />
                </div>
                <button type="submit" className="btn btn-primary my-2">Publicar Tarea</button>
            </form>
        </div>
    );
};
