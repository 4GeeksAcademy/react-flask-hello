

const CardsStudents = ({ student }) => {
   

      const options = [
        { value: "webdev", label: "Desarrollo Web" },
        { value: "ia", label: "Inteligencia Artificial" },
        { value: "datasci", label: "Ciencia de Datos" },
        { value: "cyber", label: "Ciberseguridad" },
        { value: "mobile", label: "Desarrollo Móvil" },
        { value: "devops", label: "DevOps" },
        { value: "uiux", label: "Diseño UI/UX" },
    ]

    const interestLabels = student?.interests
    ?.replace(/[{}]/g, "") 
    .split(",")            
    .map(interest => {
        const trimmed = interest.trim();
        const option = options.find(opt => opt.value === trimmed);
       
        return option?.label || trimmed;
    })
    ?.join(", ");

   const popularsSkill = [
    { value: "react", label: "React" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "docker", label: "Docker" },
    { value: "git", label: "Git" },
  ];


  const skills = student?.skills
    ?.replace(/[{}]/g, "") 
    .split(",")            
    .map(skill => {
        const trimmed = skill.trim();
        const option = popularsSkill.find(opt => opt.value === trimmed);
       
        return option?.label || trimmed;
    })
    ;

 





    return (
        <>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex">
                <div class="card card-student text-center mb-3 flex-fill ">
                    <div class="d-flex py-2 px-2">
                        <div className="d-flex flex-column mb-3 align-items-center ">
                            <div className="avatar-card-student">
                                <img src={student?.avatar} alt="Avatar" />
                            </div>
                        </div>
                        <div className="me-3 p-2">
                               <p class=" d-flex justify-content-start fs-4 card-title-student" >{student?.name}</p>                        
                            <p className="d-flex">{student?.email}</p>
                            <p className="d-flex">{interestLabels}</p>
                            
                            <div className="d-flex justify-items-center mentor-card-skills mb-2">
                            {skills?.map((s, index) => (
                                <>
                                    <div className="px-2 rounded-pill student-card-skill" key={index}>{s}</div>
                                </>
                            ))}
                        </div>
                      
                           
                        </div>
                       
                    </div>
                </div>
            </div>

        </>
    )
}

export default CardsStudents