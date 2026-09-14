import {
  CERTIFICATE_SCORE,
  COUNT,
  INFORMATION_SUBJECT,
  SCORE,
  WEIGHT,
} from '@/constants/form/constants';
import { formAtom } from '@/stores';
import { useAtomValue } from 'jotai';
import type { AchievementLevel } from '@/types/form/client';
import { getAchivementLevel } from '@/utils';

enum AchievementScore {
  '-' = 0,
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  'F' = 0,
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
type AttendanceKey =
  | 'absenceCount'
  | 'latenessCount'
  | 'earlyLeaveCount'
  | 'classAbsenceCount';

const CORE_SUBJECTS = ['국어', '영어', '수학'];

// 정보 교과는 1학년 성적도 가중치 산출에 포함한다.
const INFORMATION_LEVEL_KEYS = [
  'achievementLevel11',
  'achievementLevel12',
  'achievementLevel21',
  'achievementLevel22',
  'achievementLevel31',
] as const;

const INFORMATION_FALLBACK_LEVEL = 'C';

const useGradeCalculation = () => {
  const form = useAtomValue(formAtom);

  // 정보 교과 가중치 = (정보 교과 성적 환산 점수 총합 / 정보 교과 총 이수학기) x 0.5
  // 가중치 산출에 사용할 정보 교과 성적이 없는 경우 C로 환산하여 반영한다.
  const getInformationWeight = () => {
    const informationSubject = form.grade.subjectList?.find(
      (subject) => subject.subjectName === INFORMATION_SUBJECT,
    );

    const achievementLevels = INFORMATION_LEVEL_KEYS.map(
      (key) => informationSubject?.[key],
    ).filter(
      (achievementLevel): achievementLevel is Exclude<AchievementLevel, '-' | 'F'> =>
        achievementLevel !== undefined &&
        achievementLevel !== '-' &&
        achievementLevel !== 'F',
    );

    const averageScore = achievementLevels.length
      ? achievementLevels.reduce(
          (acc, achievementLevel) => acc + AchievementScore[achievementLevel],
          0,
        ) / achievementLevels.length
      : AchievementScore[INFORMATION_FALLBACK_LEVEL];

    return averageScore * WEIGHT.INFORMATION;
  };

  const getScoreOf = (achievementLevelKey: AchievementLevelKey) => {
    const scoreTotal = form.grade.subjectList?.reduce((acc, subject) => {
      const achievementLevel = subject[achievementLevelKey];
      const subjectName = subject.subjectName;
      let score: number;
      if (CORE_SUBJECTS.includes(subjectName) && achievementLevel === 'F') {
        score = AchievementScore['C'];
      } else {
        score = AchievementScore[achievementLevel];
      }

      return acc + (subject.subjectName === '수학' ? 2 * score : score);
    }, 0);
    const scoreLength = form.grade.subjectList?.reduce((acc, subject) => {
      const achievementLevel = subject[achievementLevelKey];
      const subjectName = subject.subjectName;
      if (
        (!CORE_SUBJECTS.includes(subjectName) && achievementLevel === 'F') ||
        achievementLevel === '-'
      ) {
        return acc;
      }
      return acc + (subject.subjectName === '수학' ? 2 : 1);
    }, 0);

    if (scoreLength === 0) {
      return 0;
    }

    return scoreTotal / scoreLength;
  };
  const calculateRegularScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      const regularTotal = form.grade.subjectList?.reduce((acc, subject) => {
        const achievementLevel = subject.score ? getAchivementLevel(subject.score) : 'E';

        if (achievementLevel) {
          if (subject.subjectName === '수학') {
            return acc + AchievementScore[achievementLevel] * 2;
          }
          return acc + AchievementScore[achievementLevel];
        }
        return acc;
      }, 0);

      const regularLength = form.grade.subjectList?.length + 1;

      const regularScore =
        SCORE.GED_REGULAR_TYPE + (WEIGHT.GED_REGULAR * regularTotal) / regularLength;

      return Number(regularScore.toFixed(3));
    }

    const regularScore =
      SCORE.REGULAR_TYPE +
      WEIGHT.REGULAR_21_22 *
        (getScoreOf('achievementLevel21') + getScoreOf('achievementLevel22')) +
      WEIGHT.REGULAR_31 * getScoreOf('achievementLevel31') +
      getInformationWeight();

    return Number(regularScore.toFixed(3));
  };

  const calculateSpecialScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      const regularTotal = form.grade.subjectList?.reduce((acc, subject) => {
        const achievementLevel = subject.score ? getAchivementLevel(subject.score) : 'E';

        if (achievementLevel) {
          if (subject.subjectName === '수학') {
            return acc + AchievementScore[achievementLevel] * 2;
          }
          return acc + AchievementScore[achievementLevel];
        }
        return acc;
      }, 0);

      const regularLength = form.grade.subjectList?.length + 1;

      const regularScore =
        SCORE.GED_SPECIAL_TYPE + (WEIGHT.GED_SPECIAL * regularTotal) / regularLength;

      return Number(regularScore.toFixed(3));
    }

    const specialScore =
      SCORE.SPECIAL_TYPE +
      WEIGHT.SPECIAL_21_22 *
        (getScoreOf('achievementLevel21') + getScoreOf('achievementLevel22')) +
      WEIGHT.SPECIAL_31 * getScoreOf('achievementLevel31') +
      getInformationWeight();

    return Number(specialScore.toFixed(3));
  };

  const calculateAttendanceScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return SCORE.ATTENDANCE;
    }

    const getAttendanceCount = (type: AttendanceKey) => {
      return (
        form.grade.attendance1[type] +
        form.grade.attendance2[type] +
        form.grade.attendance3[type]
      );
    };

    const absenceCount =
      getAttendanceCount('absenceCount') +
      Math.floor(
        (getAttendanceCount('latenessCount') +
          getAttendanceCount('earlyLeaveCount') +
          getAttendanceCount('classAbsenceCount')) /
          3,
      );

    const attendanceScore =
      absenceCount >= COUNT.MIN_ABSENCE_FOR_ZERO
        ? SCORE.MIN_ATTENDANCE
        : SCORE.MAX_ATTENDANCE - absenceCount;

    return Math.round(attendanceScore);
  };

  const calculateVolunteerScore = () => {
    const totalVolunteerTime =
      form.grade.volunteerTime1 + form.grade.volunteerTime2 + form.grade.volunteerTime3;

    if (totalVolunteerTime < COUNT.MIN_VOLUNTEER) return SCORE.MIN_VOLUNTEER;
    if (totalVolunteerTime > COUNT.MAX_VOLUNTEER) return SCORE.MAX_VOLUNTEER;

    const volunteerTime =
      SCORE.MAX_VOLUNTEER - (COUNT.MAX_VOLUNTEER - totalVolunteerTime) * 0.5;
    return Math.round(volunteerTime);
  };

  const calculateCertificateScore = () => {
    const certificateList = form.grade.certificateList ?? [];

    return certificateList.reduce(
      (highestScore, certificate) =>
        Math.max(highestScore, CERTIFICATE_SCORE[certificate] ?? 0),
      0,
    );
  };

  const calculateMentoringProgramScore = () =>
    form.grade.mentoringProgram ? SCORE.MENTORING_PROGRAM : 0;

  const calculateBonusScore = () =>
    Math.min(
      calculateCertificateScore() + calculateMentoringProgramScore(),
      SCORE.MAX_BONUS,
    );

  const regularScore = calculateRegularScore();
  const specialScore =
    form.type === 'SPECIAL_ADMISSION' ? calculateRegularScore() : calculateSpecialScore();
  const attendanceScore = calculateAttendanceScore();
  const volunteerScore = calculateVolunteerScore();
  const bonusScore = calculateBonusScore();

  const regularTotalScore = (
    regularScore +
    attendanceScore +
    volunteerScore +
    bonusScore
  ).toFixed(3);
  const specialTotalScore = (
    specialScore +
    attendanceScore +
    volunteerScore +
    bonusScore
  ).toFixed(3);

  return {
    regularScore,
    specialScore,
    attendanceScore,
    volunteerScore,
    bonusScore,
    regularTotalScore,
    specialTotalScore,
  };
};

export default useGradeCalculation;
