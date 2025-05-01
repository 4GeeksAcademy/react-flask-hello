import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const GoogleApi = () => {
    const { store, dispatch } = useGlobalReducer()
    
      return (
        <div className="container-fluid min-vh-100"> {/*ensures your element is at least as tall as the viewport—if your content is taller, it will grow and scroll. */}
          <div className="row h-100"> {/* Ensures the row takes up the full height of its parent container */}
             <div className="col-9 h-100 bg-light">aaa</div>  
             <div className="col-3 h-100 bg-sucess">aaa</div>    

            
          </div>
            
    
          <Link to="/">
            <button className="btn btn-primary">Back home</button>
          </Link>
        </div>
      );
    };
