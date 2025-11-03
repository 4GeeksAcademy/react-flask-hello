import { useState } from "react"
import userServices from "../services/userServices"
import { div } from "framer-motion/client"
import { SearchCode } from 'lucide-react';
import ResulSearchMentor from "../components/ResultSearchMentor"

const Search = () => {
    const [search, setSearch] = useState()
    const [mentors, setMentors] = useState([])
    
   
    const handleChange = (e) => {

        setSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()

        userServices.searchMentorProfile(search).then(data => {

            console.log(data)
            if (data.count < 0) {
                setMentors([])
            }
            setMentors(data.data)
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
           <div className="d-flex">
            {mentors && mentors?.map(mentor =>(<div >
                 <ResulSearchMentor mentor={mentor} />
            </div>))}
            </div>
        </>
    )


}

export default Search