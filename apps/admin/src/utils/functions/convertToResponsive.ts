const BASE_WIDTH = 1920;

const convertToResponsive = (minPx: number, maxPx: number) =>
  `clamp(${minPx}px, ${(maxPx / BASE_WIDTH) * 100}vw, ${maxPx}px)`;

export default convertToResponsive;
