import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CocktailIcon from "../../assets/navbar-svgs/cocktail-svgrepo-com (1).svg";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <div className="notfound-content">
          <div className="notfound-code">
            <span className="digit">4</span>
            <img src={CocktailIcon} alt="0" className="digit cocktail-icon" />
            <span className="digit">4</span>
          </div>
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
