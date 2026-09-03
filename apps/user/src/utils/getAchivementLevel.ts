enum AchivementLevel {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

const getAchivementLevel = (score: number) => {
  switch (true) {
    case score >= 99:
      return AchivementLevel.A;
    case score >= 97:
      return AchivementLevel.B;
    case score >= 93:
      return AchivementLevel.C;
    case score >= 89:
      return AchivementLevel.D;
    default:
      return AchivementLevel.E;
  }
};

export default getAchivementLevel;
