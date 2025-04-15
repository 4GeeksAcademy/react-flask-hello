export const XPBar = ({ xp, maxXp }) => (
    <div className="progress">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${(xp / maxXp) * 100}%` }}
        aria-valuenow={xp}
        aria-valuemin="0"
        aria-valuemax={maxXp}
      >
        {xp} XP
      </div>
    </div>
  );