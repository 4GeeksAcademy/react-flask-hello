import React, {useState, useEffect} from "react"
import {Menu, X, ChevronDown, ChevronUp} from "lucide-react"
import { Link } from "react-router-dom";


const navbarStyles = {
    navbar: (isSticky, scrollProgress) =>({
     position : isSticky ? "fixed" : "relative",
     top:0,
     left: 0,
     width: "100%",
     padding: "15px 30px",
     display: "flex",
     justifyContent: "space-between",
     alignItems:"center",
     zIndex : 1000,
     transition: "all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
     background : isSticky
     ? `linear-gradient(135deg, #213448 ${scrollProgress}%, #94B4C1 100%)`
     : `linear-gradient(135deg, #547792 ${scrollProgress}%, #ECEFCA 100%)`,
     boxShadow: isSticky
     ? "0 10px 30px #94B4C1"
     : "none",
     backdropFilter : isSticky ? "blur(8px)" : "none",
     borderBottom : isSticky ? "1px solid #ECEFCA": "none",
     transform : isSticky ? "translateY(0)" : "translateY(0)"
     }),
      logo: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '28px',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(10deg, #ECEFCA,rgb(66, 66, 64))',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow: '0 2px 10px rgb(44, 26, 117)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  menu:{
    display:"flex",
    gap: '30px',
    listStyle:"none",
    margin:0,
    padding:0
  },
  menuItem: (isSticky) =>({
    position : "relative",
    cursor : "pointer",
    fontSize: "16px",
    fontWeight: "500",
    color: isSticky ? "#ECEFCA" : "#ECEFCA",
    transition: "all 0.3s ease",
    textShadow : isSticky ? "0 0 5px #ECEFCA" : "none",
   }),
   menuItemHover :{
    transform : "translateY(-2px)"
   },
   menuLink: {
    padding: "8px 0",
    display:"block",
    position: "relative",
    color: "#213448"
   },
    menuLinkAfter: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '2px',
    background: 'linear-gradient(to right, #ECEFCA , #FF9933)',
    transition: 'width 0.3s ease',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    color: '#ECEFCA',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
    '@media (maxWidth: 768px)': {
      display: 'block',
    },
  },
  spacer: {
    height: '80px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
   progress: (scrollProgress) =>({
     position: "fixed",
     top:0,
     left:0,
     height: "3px",
     width:`${scrollProgress}%`,
     background: "linear-gradient(to right, #ECEFCA,rgb(107, 120, 237))",
     zIndex:2000,
     transition: "width 0,1s ease-out"
   })
}
export const Navbar =()=>{
   const[isSticky, setIsSticky] = useState(false)
   const[scrollProgress, setScrollProgress] = useState(0)
   const [hoverIndex, setHoverIndex]= useState(null)
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   const [isMobile, setIsMobile] = useState(false)
   // Una funcion que detecte cuando el usuario esta hacinedo y scroll y el tamaño de la pantalla para saber cuando es un dispositivo movil.
   useEffect(()=>{
    const handleScroll=() =>{
        //Si el scroll es mayor a 100 px en el eje Y activamos el estado Sticky, que en un principio en el useState comenzo como false
        if(window.scrollY > 100){
            setIsSticky(true)
        }else{
            setIsSticky(false)
        }
        // Logica para calcular el progreso del scroll para poder ejecutar efectos visuales a determinada altura del progreso del scroll
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
    }
      //Logica para detectar cuando el tamaño de la ventana es movil, o es un desktop
    const handleResize = () =>{
        setIsMobile(window.innerWidth <= 768)
    }
    //Incializamos el estado Movil
    handleResize()
    //añadimos los event Listeners pertienentes
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    //Limpieza de los event listeners cuando el componente se desmonta
    return () => {
    window.removeEventListener("scroll", handleScroll)
    window.removeEventListener("resize", handleResize)
    }
    }, [])
    const menuItems = [
        {name : "Sobre Nosotros", link: "#"},
        {name : "Nutricion", link: "#"},
        {name : "Deporte", link: "#"},
        {name : "Profesional", link: "#"},
        {name : "Loging", link: "#"},
    ]
     return(
         <>
         {/* Barra de progresso del Scroll */}
         <div style={navbarStyles.progress(scrollProgress)}></div>
         <nav style={navbarStyles.navbar(isSticky,scrollProgress)}>
            <div style={navbarStyles.logo}>
                <span className ="logo-text">DMPC<span style={{color: "#213448"}}>ProFit</span></span>
                </div>
         <ul style= {{
            display:"flex",
            gap:"30px",
            listStyle: "none",
            margin:0,
            padding:0,
            transform : window.innerWidth <= 768 && !mobileMenuOpen ? "translateX(100%)" : "translateX(0)",
            position : window.innerWidth <= 768 ? "fixed" : "relative",
            top : window.innerWidth <= 768 ? "0" : "auto",
            right : window.innerWidth <= 768 ? "0" : "auto",
            height : window.innerWidth <= 768 ? "100vh" : "auto",
            width: window.innerWidth <= 768 ? "250px" : "auto",
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
            background : window.innerWidth <= 768 ?rgb(29, 29, 29) : "transparent",
            transition : "transform 0.s ease-in-out",
            zIndex: 1000,
         }}>
          {menuItems.map((item,index)=>(
            <li key = {index} style={{
                ...navbarStyles.menuItem(isSticky),
                ...(hoverIndex === index ? navbarStyles.menuItemHover: {})
            }}
            onMouseEnter={()=> setHoverIndex(index)}
            onMouseLeave={()=> setHoverIndex(null)}
            >
            <a
            href={item.link}
            style={navbarStyles.menuLink}
            >
            {item.name}
            <span style={{
             ...navbarStyles.menuLinkAfter,
             width: hoverIndex === index ? "100%" : "0%"
            }}></span>
            </a>
             </li>
          )
        )}
         </ul>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
         style={navbarStyles.mobileMenuBtn}
            >
            {mobileMenuOpen ? <X size={24} /> : <Menu size = {24 } />}
         </button>
         </nav>

        
    
         </>
    )
}
