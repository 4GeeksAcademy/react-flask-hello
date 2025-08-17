export const CardEvento = ({ item }) => {
  return (
    <article className="dest-card">
      {
        item.portada ? (
          <div className="img-container">
            <img src={item.portada} alt={item.titulo} className="img-card" />
          </div>
        ) : (
          <div className="img-container">

          </div>
        )
      }

      <div className="meta">
        <h3 className="title">{item.titulo}</h3>
        <p className="country">{item.precio}</p>
      </div>
    </article>
  )
};