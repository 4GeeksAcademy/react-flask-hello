import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import DownloadExcelButton from "./downloadiventary.jsx";


 const Home = () => {

	return (

		
    <div className="p-2 bg-blue-500 text-white rounded">
      <DownloadExcelButton />
    </div>
  );
}; 


export default Home;