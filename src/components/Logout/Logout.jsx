import "./Logout.scss";

function Logout({ onBevestig, onAnnuleer }) {
  return (
    <div className="logout-modal-overlay" onClick={onAnnuleer}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <p className="logout-modal-tekst">Wilt u uitloggen?</p>
        <div className="logout-modal-buttons">
          <button className="logout-btn-annuleer" onClick={onAnnuleer}>
            Annuleren
          </button>
          <button className="logout-btn-bevestig" onClick={onBevestig}>
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
