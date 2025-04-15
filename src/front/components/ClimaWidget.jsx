export const ClimaWidget = ({ city = "Barcelona", temp = "22°C" }) => (
    <div className="alert alert-info">
      <strong>{city}</strong>: {temp} 🌤️
    </div>
  );