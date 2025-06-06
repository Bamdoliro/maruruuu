import { COUNT, SCORE, WEIGHT } from '@/constants/form/constants';
import { useFormValueStore } from '@/stores';
import { getAchivementLevel } from '@/utils';

enum AchievementScore {
  '-' = 0,
  'A' = 5,
  'B' = 4,
  'C' = 3,
  'D' = 2,
  'E' = 1,
}

type AchievementLevelKey =
  | 'achievementLevel21'
  | 'achievementLevel22'
  | 'achievementLevel31';
type AttenedanceKey =
  | 'absenceCount'
  | 'latenessCount'
  | 'earlyLeaveCount'
  | 'classAbsenceCount';

const useGradeCalculation = () => {
  const form = useFormValueStore();

  const getScoreOf = (achievementLevelKey: AchievementLevelKey) => {
    const scoreTotal = form.grade.subjectList?.reduce((acc, subject) => {
      const achievementLevel = subject[achievementLevelKey];
      const subjectName = subject.subjectName;
      if (
        (subjectName === '국어' || subjectName === '영어') &&
        achievementLevel === null
      ) {
        return acc + AchievementScore['C'];
      } else if (subjectName === '수학' && achievementLevel === null) {
        return acc + AchievementScore['C'] * 2;
      }
      if (subjectName === '수학' && achievementLevel !== null) {
        return acc + AchievementScore[achievementLevel] * 2;
      } else {
        return acc + (achievementLevel ? AchievementScore[achievementLevel] : 0);
      }
    }, 0);
    const scoreLength = form.grade.subjectList?.reduce((acc, subject) => {
      if (subject[achievementLevelKey] !== null && subject[achievementLevelKey] !== '-') {
        return acc + (subject.subjectName === '수학' ? 2 : 1);
      }
      return acc;
    }, 0);

    if (scoreLength === 0) {
      return 0;
    }

    return scoreTotal / scoreLength;
  };

  const calculateRegularScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      const regularTotal = form.grade.subjectList.reduce((acc, subject) => {
        const achievementLevel = subject.score ? getAchivementLevel(subject.score) : 'E';

        if (achievementLevel) {
          if (subject.subjectName === '수학') {
            return acc + AchievementScore[achievementLevel] * 2;
          }
          return acc + AchievementScore[achievementLevel];
        }
        return acc;
      }, 0);

      const regularLength = form.grade.subjectList.length + 1;

      const regularScore = SCORE.REGULAR_TYPE + (12 * 2 * regularTotal) / regularLength;

      return Number(regularScore.toFixed(3));
    }

    const regularScore =
      SCORE.REGULAR_TYPE +
      WEIGHT.REGULAR_21_22 *
        (getScoreOf('achievementLevel21') + getScoreOf('achievementLevel22')) +
      WEIGHT.REGULAR_31 * getScoreOf('achievementLevel31');

    return Number(regularScore.toFixed(3));
  };

  const calculateSpecialScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return 0;
    }

    const specialScore =
      SCORE.SPECIAL_TYPE +
      WEIGHT.SPECIAL_21_22 *
        (getScoreOf('achievementLevel21') + getScoreOf('achievementLevel22')) +
      WEIGHT.SPECIAL_31 * getScoreOf('achievementLevel31');

    return Number(specialScore.toFixed(3));
  };

  const calculateAttendanceScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return SCORE.ATTENDANCE;
    }

    const getAttendanceCount = (type: AttenedanceKey) => {
      const attendanceCount =
        form.grade.attendance1[type] +
        form.grade.attendance2[type] +
        form.grade.attendance3[type];

      return attendanceCount;
    };

    const absenceCount =
      getAttendanceCount('absenceCount') +
      (getAttendanceCount('latenessCount') +
        getAttendanceCount('earlyLeaveCount') +
        getAttendanceCount('classAbsenceCount')) /
        3;

    const attendanceScore =
      absenceCount > COUNT.MAX_ABSENCE
        ? SCORE.MIN_ATTENDANCE
        : SCORE.MAX_ATTENDANCE - absenceCount;

    return Math.round(attendanceScore);
  };

  const calculateVolunteerScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return SCORE.VOLUNTEER;
    }

    const totalVolunteerTime =
      form.grade.volunteerTime1 + form.grade.volunteerTime2 + form.grade.volunteerTime3;

    if (totalVolunteerTime < COUNT.MIN_VOLUNTEER) return SCORE.MIN_VOLUNTEER;
    if (totalVolunteerTime > COUNT.MAX_VOLUNTEER) return SCORE.MAX_VOLUNTEER;

    const volunteerTime =
      SCORE.MAX_VOLUNTEER - (COUNT.MAX_VOLUNTEER - totalVolunteerTime) * 0.5;
    return Math.round(volunteerTime);
  };

  const calculateCertificateScore = () => {
    let certificateScore = 0;
    if (form.grade.certificateList !== null) {
      if (
        form.grade.certificateList.includes('CRAFTSMAN_INFORMATION_PROCESSING') ||
        form.grade.certificateList.includes(
          'CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION'
        ) ||
        form.grade.certificateList.includes('CRAFTSMAN_COMPUTER')
      )
        certificateScore += 4;

      if (form.grade.certificateList.includes('COMPUTER_SPECIALIST_LEVEL_1'))
        certificateScore += 3;
      else if (form.grade.certificateList.includes('COMPUTER_SPECIALIST_LEVEL_2'))
        certificateScore += 2;
      else if (form.grade.certificateList.includes('COMPUTER_SPECIALIST_LEVEL_3'))
        certificateScore += 1;
    }

    return Math.min(certificateScore, 4);
  };

  const regularScore = calculateRegularScore();
  const specialScore =
    form.type === 'SPECIAL_ADMISSION' ? calculateRegularScore() : calculateSpecialScore();
  const attendanceScore = calculateAttendanceScore();
  const volunteerScore = calculateVolunteerScore();
  const certificateScore = calculateCertificateScore();

  const regularTotalScore = (
    regularScore +
    attendanceScore +
    volunteerScore +
    certificateScore
  ).toFixed(3);
  const specialTotalScore = (
    specialScore +
    attendanceScore +
    volunteerScore +
    certificateScore
  ).toFixed(3);

  return {
    regularScore,
    specialScore,
    attendanceScore,
    volunteerScore,
    certificateScore,
    regularTotalScore,
    specialTotalScore,
  };
};

export default useGradeCalculation;
