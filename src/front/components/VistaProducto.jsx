export const VistaProducto = () =>{
    return(
        <div className="card text-center">
  <div className="card-header">
    Titulo Producto
  </div>
  <div className="card-body">
    <p>Aqui viene la imagen del producto</p>
    
  </div>
  <div className="card-footer text-muted">
    <p>Aqui viene la descripcion del Producto</p>
    <p>aqui debajo el precio €</p>

    <button type="button" className="btn btn-secondary">Añadir al carrito</button>
  </div>
</div>
    )
}