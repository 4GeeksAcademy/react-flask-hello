import ImagenPromocional from '../assets/images/ImagenPromocional.jpg';


export const SobreNosotros = () => {
    return (
        <div className="container-fluid justify-content-center align-items-center text-center m-5">
            <div className="row ">
                <div className="col-6 text-start">
                    <h1>Sobre nosotros</h1>
                    <p>Creemos que la ropa deportiva es mucho más que funcionalidad: es una extensión de tu actitud, tu energía y tu mentalidad.</p>
                    <br />
                    <p>Nuestra misión es clara: impulsar a una nueva generación de hombres y mujeres que entrenan con propósito, viven con disciplina y buscan siempre superarse. Diseñamos ropa que inspira, potencia y acompaña ese estilo de vida.</p>
                    <br />
                    <p>Cada prenda está creada con materiales de calidad, cortes que estilizan y un diseño minimalista pero poderoso. Queremos que cuando la lleves puesta sientas confianza, seguridad y la determinación de un halcón en vuelo.</p>
                    <br />
                    <p>Nos mueve el instinto. Nos impulsa la fuerza interior. Y sabemos que tú también sientes lo mismo.</p>
                </div>
                <div className="col-6">
                    <img src={ImagenPromocional} alt="Sobre nosotros" />
                </div>
            </div>
        </div>);
};
