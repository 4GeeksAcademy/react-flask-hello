export const Card = ({d}) => {
  return (
    <article key={idx} className="dest-card">
                <div className="thumb">
                  <img src={d.img} alt={d.titulo} className="thumb-img" />
                </div>
                <div className="meta">
                  <h3 className="title">{d.titulo}</h3>
                  <p className="country">{d.pais}</p>
                </div>
              </article>
  );
}