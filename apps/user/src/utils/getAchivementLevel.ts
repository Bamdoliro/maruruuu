enum AchivementLevel {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

const getAchivementLevel = (score: number) => {
  switch (true) {
    case score >= 90:
      return AchivementLevel.A;
    case score >= 80:
      return AchivementLevel.B;
    case score >= 70:
      return AchivementLevel.C;
    case score >= 60:
      return AchivementLevel.D;
    default:
      return AchivementLevel.E;
  }
};

export default getAchivementLevel;
