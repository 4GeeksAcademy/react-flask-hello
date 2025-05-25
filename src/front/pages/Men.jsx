import BannerMen from '../assets/images/BannerMen.png'

const Men = () => {
    return (
        <div className="container-fluid bg-secondary-subtle py-5">
            <div className="row justify-content-center mb-4">
                <div className="col-12 col-md-8 text-center">
                    <h2 className="fw-bold text-uppercase text-dark mb-3">Sección Hombres</h2>
                    <hr className="border-primary w-50 mx-auto" />
                </div>
            </div>
            <div className="row justify-content-center mb-5">
                <div className="col-12 col-md-10">
                    <img 
                        src={BannerMen} 
                        alt="Banner Men" 
                        className="img-fluid rounded shadow w-100" 
                        style={{ maxHeight: '350px', objectFit: 'cover' }} 
                    />
                </div>
            </div>
            {/* Aquí se mapearan los productos para hombre */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    {/* Productos aquí */}
                </div>
            </div>
        </div>
    );
};

export default Men;

