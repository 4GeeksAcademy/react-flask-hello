import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import InventoryUploader from "../components/InventoryUploader.jsx";


 const Settings = () => {

    return (

        
    <div className="p-2 bg-blue-500 text-white rounded">
      <InventoryUploader/>
    </div>
  );
}; 


export default Settings;