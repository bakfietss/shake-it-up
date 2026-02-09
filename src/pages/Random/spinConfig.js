// spin carousel instellingen

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

export const PLACEHOLDER_IMAGES = [
  placeholder1, placeholder2, placeholder3, placeholder4, placeholder5,
  placeholder6, placeholder7, placeholder8, placeholder9, placeholder10
];

// ellips instellingen
const ELLIPSE_RADIUS_X = 3000;
const ELLIPSE_RADIUS_Y = 600;
const CENTER_Y = 0;
const VISIBLE_RANGE = 500;

const getEllipseRadiusX = () => {
  const breedte = window.innerWidth;

  if (breedte <= 1920) {
    return 2200;
  }
  return ELLIPSE_RADIUS_X;
};

const getCenterX = () => {
  const breedte = window.innerWidth;

  if (breedte <= 768) {
    return 150;
  }
  if (breedte <= 1024) {
    return 250;
  }
  if (breedte <= 1920) {
    return 395;
  }
  return 500;
};

const getEllipseRadiusY = () => {
  const breedte = window.innerWidth;

  if (breedte <= 768) {
    return 0;
  }
  if (breedte <= 1920) {
    return 440;
  }
  return ELLIPSE_RADIUS_Y;
};

const isSimpleMode = () => window.innerWidth <= 768;

// schaal voor 3d effect
const MIN_SCALE = 0.3;
const MAX_SCALE = 1.0;
const WINNER_BOOST = 2;

// spin timing
export const SPIN_DURATION = 4;
export const MIN_ROTATIONS = 1;
export const MAX_ROTATIONS = 2;

// fade animatie
export const FADE_OUT_DURATION = 0.4;
export const FADE_IN_DURATION = 0.6;
export const FADE_IN_DELAY = 0.1;

export const TOTAL_IMAGES = PLACEHOLDER_IMAGES.length;

// bereken waar een image staat op de ellips
export const getImagePosition = (index, rotationOffset = 0) => {
  if (isSimpleMode()) {
    const schermBreedte = window.innerWidth;
    const centerPos = schermBreedte / 2;
    const spreadBreedte = schermBreedte * 3.5;
    const centerOffset = -30;

    const rawAngle = (index / TOTAL_IMAGES) * 360 + rotationOffset;
    const angleDegrees = ((rawAngle % 360) + 360) % 360;

    const distanceFrom180 = Math.abs(((angleDegrees - 180 + 540) % 360) - 180);
    const isWinner = distanceFrom180 < 5;

    const offsetVanMidden = ((angleDegrees - 180 + 540) % 360) - 180;
    const x = centerPos + centerOffset + (offsetVanMidden / 180) * (spreadBreedte / 2);

    const isVisible = x > -150 && x < schermBreedte + 150;

    return { x, y: 0, scale: 1, zIndex: isWinner ? 100 : 50, isVisible, isWinner };
  }

  const rawAngle = (index / TOTAL_IMAGES) * 360 + rotationOffset;
  const angleDegrees = ((rawAngle % 360) + 360) % 360;
  const angle = angleDegrees * (Math.PI / 180);

  const radiusX = getEllipseRadiusX();
  const ellipseX = Math.cos(angle) * radiusX;
  const ellipseY = Math.sin(angle) * getEllipseRadiusY();

  const x = ellipseX + radiusX + getCenterX();
  const y = ellipseY + CENTER_Y;

  const depth = (ellipseX + radiusX) / (2 * radiusX);
  const baseScale = MAX_SCALE - (depth * (MAX_SCALE - MIN_SCALE));
  const zIndex = Math.round((1 - depth) * 100);

  const distanceFrom180 = Math.abs(((angleDegrees - 180 + 540) % 360) - 180);
  const boostFactor = Math.max(0, 1 - distanceFrom180 / 36);
  const scale = baseScale * (1 + (WINNER_BOOST - 1) * boostFactor);
  const isVisible = distanceFrom180 <= VISIBLE_RANGE;
  const isWinner = distanceFrom180 < 5;

  return { x, y, scale, zIndex, isVisible, isWinner };
};
