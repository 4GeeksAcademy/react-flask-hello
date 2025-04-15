export const LevelUpPopup = ({ level, onClose }) => (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¡Subiste de nivel!</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <h1>🎉 Nivel {level} 🎉</h1>
            <p>¡Felicidades por tu progreso!</p>
          </div>
        </div>
      </div>
    </div>
  );