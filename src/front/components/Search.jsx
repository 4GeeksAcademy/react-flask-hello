import { useState } from "react"
import userServices from "../services/userServices"
import { div } from "framer-motion/client"
import { SearchCode } from 'lucide-react';
import ResultSearchMentor from "../components/ResultSearchMentor"

const Search = () => {
    const [search, setSearch] = useState("")
    const [mentors, setMentors] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()
    const handleChange = (e) => {

        setSearch(e.target.value)
       
    }

    const handleSearch = (e) => {
       
        setLoading(true)
        userServices.searchMentorProfile(search).then(data => {


            if (data.count <= 0) {
                setMentors([])
                setMessage("¡No se han encontrado mentores con tu interes!")
            }
            setLoading(false)
            setMentors(data.data)

        })
    }

    return (
        <>


            <div className="d-flex justify-content-center align-items-center my-5 ">
                <div className="search w-50 d-flex flex-column  justify-items-center  p-4">
                    <p>En que tecnologia necesitas ayuda?</p>
                    <input type="text" className="search-input" value={search} onChange={handleChange} placeholder="Ej: Python, JavaScript, UX"></input>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-sm search-btn  " onClick={handleSearch}><span className='me-1'><SearchCode /></span>Buscar Mentores</button>
                        {loading && <div className="spinner-border text-white ms-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row g-4 justify-content-center ">
                    {mentors.length <= 0 && <h2 className="text-center">{message}</h2>}
                    {mentors && mentors?.map(mentor => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={mentor.id}>
                            <ResultSearchMentor mentor={mentor} />
                        </div>))}
                </div>



            </div>
            <div className="d-flex justify-content-center align-items-center">

            </div>
        </>
    )


}

export default Search