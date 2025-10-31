import { useState } from "react"
import userServices from "../services/userServices"
import { div } from "framer-motion/client"
import { SearchCode } from 'lucide-react';

const Search = () => {
    const [search, setSearch] = useState()
    const [result, setResult] = useState([])
    
   
    const handleChange = (e) => {

        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()

        userServices.searchMentorProfile(search).then(data => {
            if (data.count < 0) {
                setResult([])
            }
            setResult(data.data)
        })
    }

    return (
        <>
           
           
            <div className="d-flex justify-content-center align-items-center my-5 ">
            <div className="search w-50 d-flex flex-column  justify-items-center  p-4">
                <p>En que tecnologia necesitas ayuda?</p>
                <input type="text" className="search-input" value={search} onChange={handleChange} placeholder="Ej: Python, JavaScript, UX"></input>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-sm search-btn  " onClick={handleSearch}><span className='me-1'><SearchCode /></span>Bucar Mentores</button>
                </div>
            </div>
           </div>
            {result && result?.map(e =>(<div>
                <p>{e.name}</p>
            </div>))}
        </>
    )


}

export default Search