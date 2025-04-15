export const CategorySwiper = ({ categories = [] }) => (
    <div className="d-flex overflow-auto mb-3">
      {categories.map((cat, index) => (
        <button key={index} className="btn btn-outline-primary mx-1">{cat}</button>
      ))}
    </div>
  );