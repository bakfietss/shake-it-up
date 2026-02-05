import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-content">
          <h1 className="notfound-code">404</h1>
          <h2>Oeps! Deze pagina is leeg</h2>
          <p>
            Het lijkt erop dat deze cocktail nog niet op de menukaart staat.
            <br />
            Misschien is ie opgedronken?
          </p>

          <div className="notfound-actions">
            <Link to="/">
              <Button btnType="solid">Terug naar home</Button>
            </Link>
            <Link to="/search">
              <Button btnType="outline">Zoek een cocktail</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
