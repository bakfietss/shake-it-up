import React from "react";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import "./Random.scss";

import placeholder1 from "../../assets/placeholder-imgs/drink_icons001-01_g172.png";
import placeholder2 from "../../assets/placeholder-imgs/drink_icons001-01_g234.png";
import placeholder3 from "../../assets/placeholder-imgs/drink_icons001-01_g335.png";
import placeholder4 from "../../assets/placeholder-imgs/drink_icons001-01_g419.png";
import placeholder5 from "../../assets/placeholder-imgs/drink_icons001-01_g562.png";
import placeholder6 from "../../assets/placeholder-imgs/drink_icons001-01_g628.png";
import placeholder7 from "../../assets/placeholder-imgs/drink_icons001-01_g75.png";
import placeholder8 from "../../assets/placeholder-imgs/drink_icons001-01_g750.png";
import placeholder9 from "../../assets/placeholder-imgs/drink_icons001-01_g875.png";
import placeholder10 from "../../assets/placeholder-imgs/drink_icons001-01_g997.png";

const placeholderImages = [
  placeholder1, placeholder2, placeholder3, placeholder4, placeholder5,
  placeholder6, placeholder7, placeholder8, placeholder9, placeholder10
];

const Random = () => {
  return (
    <div className="random-wrapper">
      <div className="random-page">
        <div className="random-left">
          <div className="title-button-row">
            <div className="title-wrapper">
              <h1 className="spin-title">Spin the <br />Shaker</h1>
            </div>
            <div className="button-wrapper">
              <Button
                btnType="solid"
                animation="glow"
                size="large"
              >
                SPIN
              </Button>
            </div>
          </div>

          <div className="description-wrapper">
            <p className="spin-description">
              Hit the button, watch it roll, and meet your
              next favorite cocktail in a few seconds.
            </p>
          </div>

          <div className="recent-spins-wrapper">
            <div className="recent-spins-grid">
              {placeholderImages.slice(0, 3).map((img, index) => (
                <div key={index} className="recent-spin-item">
                  <img src={img} alt={`Cocktail ${index + 1}`} />
                </div>
              ))}
            </div>
            <span className="recent-label">Last spins</span>
          </div>
        </div>

        <div className="random-right"></div>
      </div>

      {/* Zie SCSS commentaar */}
      <Footer />
    </div>
  );
};

export default Random;
