export const AchievementBadge = ({ title, icon }) => (
    <div className="text-center mx-2">
      <img src={icon} alt={title} style={{ width: 60 }} />
      <p className="small mt-1">{title}</p>
    </div>
  );