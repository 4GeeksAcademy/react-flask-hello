import CreatableSelect from "react-select/creatable"
import { useState } from "react"
import { div } from "framer-motion/client"

const SkillsSelect = ({skills, setSkills, popularsSkill}) => {
    //const [skills, setSkills] = useState([])

    /*
    const popularsSkill = [
        { value: "react", label: "React" },
        { value: "node", label: "Node.js" },
        { value: "python", label: "Python" },
        { value: "docker", label: "Docker" },
        { value: "git", label: "Git" },
    ]
*/
    return (
        <div>
            <label className="form-label fw-bold">Habilidades</label>
            <CreatableSelect
                isMulti
                options={popularsSkill}
                value={skills}
                onChange={setSkills}
                placeholder="Escribe o selecciona habilidades, Ej: Python, JS, Node.JS..."
            />
        </div>





    )




}
export default SkillsSelect