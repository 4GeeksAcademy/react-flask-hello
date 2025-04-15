export const MoodSelector = ({ onSelect }) => (
    <div className="d-flex justify-content-around">
      {["😊", "😐", "😞"].map((mood, i) => (
        <span key={i} style={{ fontSize: 32, cursor: 'pointer' }} onClick={() => onSelect(mood)}>
          {mood}
        </span>
      ))}
    </div>
  );