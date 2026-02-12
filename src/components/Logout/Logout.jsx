import "./Logout.scss";

function Logout({ onConfirm, onCancel }) {
  return (
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <p className="logout-modal-tekst">Wilt u uitloggen?</p>
        <div className="logout-modal-buttons">
          <button className="logout-btn-annuleer" onClick={onCancel}>
            Annuleren
          </button>
          <button className="logout-btn-bevestig" onClick={onConfirm}>
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
