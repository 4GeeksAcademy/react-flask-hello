import React, { useEffect } from "react"
import DownloadExcelButton from "../components/DownloadInventary.jsx";
import "./Styles/Settings.css";

 const Home = () => {

	return (

		
    <div className="p-2 bg-blue-500 text-white rounded">
      <DownloadExcelButton />
    </div>
  );
}; 


export default Home;