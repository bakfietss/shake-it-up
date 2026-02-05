import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import "./Random.scss";

// Spin carousel configuratie
import {
  PLACEHOLDER_IMAGES,
  TOTAL_IMAGES,
  SPIN_DURATION,
  MIN_ROTATIONS,
  MAX_ROTATIONS,
  FADE_OUT_DURATION,
  FADE_IN_DURATION,
  FADE_IN_DELAY,
  getImagePosition
} from "./spinConfig";

import { testCocktails } from "../../helpers/testData";

const RECENT_SPINS_KEY = 'shakeItUp_recentSpins';
const MAX_RECENT_SPINS = 4;

const Random = () => {
  const [recentSpins, setRecentSpins] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);

  const [showWinnerContent, setShowWinnerContent] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [winnerCocktail, setWinnerCocktail] = useState(null);

  const rotationRef = useRef({ value: 0 });

  // Laad recent spins uit localStorage bij eerste load
  useEffect(() => {
    try {
      const opgeslagen = localStorage.getItem(RECENT_SPINS_KEY);
      if (opgeslagen) {
        const parsed = JSON.parse(opgeslagen);
        setRecentSpins(parsed);
      }
    } catch (err) {
      console.error("Kon recent spins niet laden:", err);
    }
  }, []);

  // Voeg cocktail toe aan recent spins
  const voegToeAanRecentSpins = (nieuweCocktail) => {
    setRecentSpins((huidige) => {
      const gefilterd = huidige
        .filter((spin) => spin.idDrink !== nieuweCocktail.idDrink)
        .map((spin) => ({ ...spin, isNieuw: false }));

      const bijgewerkt = [
        {
          idDrink: nieuweCocktail.idDrink,
          strDrink: nieuweCocktail.strDrink,
          strDrinkThumb: nieuweCocktail.strDrinkThumb,
          isNieuw: true,
        },
        ...gefilterd,
      ].slice(0, MAX_RECENT_SPINS);

      try {
        const voorOpslag = bijgewerkt.map(({ isNieuw, ...rest }) => rest);
        localStorage.setItem(RECENT_SPINS_KEY, JSON.stringify(voorOpslag));
      } catch (err) {
        console.error("Kon recent spins niet opslaan:", err);
      }
      return bijgewerkt;
    });

    setTimeout(() => {
      setRecentSpins((huidige) =>
        huidige.map((spin) => ({ ...spin, isNieuw: false }))
      );
    }, 600);
  };

  const haalRandomCocktailOp = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const randomIndex = Math.floor(Math.random() * testCocktails.length);
    return testCocktails[randomIndex];
  };

  // Spin het wiel met GSAP
  const spinWiel = (onComplete) => {
    const randomImageIndex = Math.floor(Math.random() * TOTAL_IMAGES);
    const anglePerImage = 360 / TOTAL_IMAGES;
    const targetOffset = 180 - (randomImageIndex * anglePerImage);

    const huidigeOffset = ((rotationRef.current.value % 360) + 360) % 360;

    let basisDraai = targetOffset - huidigeOffset;
    if (basisDraai < 0) basisDraai += 360;

    const randomRotaties = Math.floor(Math.random() * (MAX_ROTATIONS - MIN_ROTATIONS + 1));
    const extraRotaties = MIN_ROTATIONS + randomRotaties;
    const totaalDraai = basisDraai + (extraRotaties * 360);

    const eindRotatie = rotationRef.current.value + totaalDraai;

    gsap.to(rotationRef.current, {
      value: eindRotatie,
      duration: SPIN_DURATION,
      ease: "power2.out",
      onUpdate: () => {
        setRotationOffset(rotationRef.current.value);
      },
      onComplete: () => {
        setIsSpinning(false);
        if (onComplete) onComplete();
      }
    });
  };

  // Start fade-out, dan spin, dan fade-in
  const handleRandomize = async () => {
    if (isSpinning || isFadingOut) return;

    if (showWinnerContent) {
      setIsFadingOut(true);

      setTimeout(() => {
        setShowWinnerContent(false);
        setIsFadingOut(false);
        startSpin();
      }, FADE_OUT_DURATION * 1000);
    } else {
      startSpin();
    }
  };

  // Start de spin en haal cocktail op
  const startSpin = async () => {
    setIsSpinning(true);

    const cocktailPromise = haalRandomCocktailOp();

    spinWiel(async () => {
      const nieuweCocktail = await cocktailPromise;

      if (nieuweCocktail) {
        setWinnerCocktail(nieuweCocktail);
        voegToeAanRecentSpins(nieuweCocktail);

        setTimeout(() => {
          setShowWinnerContent(true);
        }, FADE_IN_DELAY * 1000);
      }
    });
  };

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
                onClick={handleRandomize}
                disabled={isSpinning}
                className={isSpinning ? "btn-spinning" : ""}
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

          {recentSpins.filter(spin => spin.idDrink !== winnerCocktail?.idDrink).length > 0 && (
            <div className="recent-spins-wrapper">
              <div className="recent-spins-grid">
                {recentSpins
                  .filter(spin => spin.idDrink !== winnerCocktail?.idDrink)
                  .slice(0, 3)
                  .map((spin) => (
                    <Link
                      key={spin.idDrink}
                      to={`/cocktail/${spin.idDrink}`}
                      className={`recent-spin-item ${spin.isNieuw ? 'nieuw' : ''}`}
                    >
                      <img src={spin.strDrinkThumb} alt={spin.strDrink} />
                    </Link>
                  ))}
              </div>
              <span className="recent-label">Last spins</span>
            </div>
          )}
        </div>

        <div className="random-right">
          <div className="wheel-container">
            {PLACEHOLDER_IMAGES.map((img, index) => {
              const pos = getImagePosition(index, rotationOffset);
              return (
                <div
                  key={index}
                  className="wheel-image-wrapper"
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                    zIndex: pos.zIndex,
                    opacity: pos.isVisible ? 1 : 0,
                    pointerEvents: pos.isVisible ? 'auto' : 'none',
                  }}
                >
                  {pos.isWinner && showWinnerContent && (
                    <div
                      className={`winner-title ${isFadingOut ? 'fading-out' : 'fading-in'}`}
                      style={{ animationDuration: `${isFadingOut ? FADE_OUT_DURATION : FADE_IN_DURATION}s` }}
                    >
                      <h2>{winnerCocktail?.strDrink || 'Your cocktail'}</h2>
                    </div>
                  )}

                  <img
                    src={img}
                    alt={`Cocktail ${index + 1}`}
                    className={`wheel-image placeholder-image ${pos.isWinner && showWinnerContent ? 'fading-out' : ''}`}
                    style={pos.isWinner && showWinnerContent ? { animationDuration: `${FADE_IN_DURATION}s` } : {}}
                  />

                  {pos.isWinner && showWinnerContent && winnerCocktail && (
                    <img
                      src={winnerCocktail.strDrinkThumb}
                      alt={winnerCocktail.strDrink}
                      className={`wheel-image real-image ${isFadingOut ? 'fading-out' : 'fading-in'}`}
                      style={{ animationDuration: `${isFadingOut ? FADE_OUT_DURATION : FADE_IN_DURATION}s` }}
                    />
                  )}

                  {pos.isWinner && showWinnerContent && (
                    <div
                      className={`winner-button ${isFadingOut ? 'fading-out' : 'fading-in'}`}
                      style={{ animationDuration: `${isFadingOut ? FADE_OUT_DURATION : FADE_IN_DURATION}s` }}
                    >
                      <Link to={`/cocktail/${winnerCocktail?.idDrink}`}>
                        <Button
                          btnType="solid"
                          animation="glow"
                          disabled={isSpinning}
                        >
                          Create now!
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zie SCSS commentaar */}
      <Footer />
    </div>
  );
};

export default Random;
