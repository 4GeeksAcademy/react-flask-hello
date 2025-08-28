export const AdminCard = () => {
    const [vehicle, setVehicle] = useState(null);
    const [des, setDes] = useState(null)
    
    const getVehicle = async () => {
        try {
          const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`)
    
          const data = await response.json()
          
          setVehicle(data.result.properties)
          setDes(data.result)
          console.log(data.result.properties)
          console.log(data.result)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        getVehicle()
      }, [])
   
    return(
    <div className="card mb-3">
        <div className="row g-0">
            <div className="col-3">
                <img src="https://i.pinimg.com/564x/40/c5/3f/40c53ff5a0da610aa4daff660c962961.jpg" className="img-fluid rounded-circle my-2" alt="..." />
            </div>
            <div className="col-9 d-flex">
                <div className="card-body">
                    <h5 className="card-title fs-4">Nombre Apellido</h5>
                    <p className="card-text fs-5">Administrador principal</p>
                    <p className="card-text">lol@email.com</p>
                    <p className="card-text"><small className="text-muted">Miembro desde xd</small></p>
                </div>
                <div className="card-body">
                    <p className="card-text"><small className="text-muted">Ultima conexión<br/> 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
);}