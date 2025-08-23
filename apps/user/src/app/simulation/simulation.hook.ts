import { useFormValueStore } from '@/stores';
import { useState } from 'react';

export const useNavigationClick = () => {
  const form = useFormValueStore();
  const [currentStep, setCurrentStep] = useState('성적 입력');

  const handleMoveStep = (step: string) => {
    const qualificationExam =
      form.education.graduationType === 'QUALIFICATION_EXAMINATION';
    const nowStep = step === '출결상황' || step === '봉사시간';

    if (qualificationExam && nowStep) {
      alert('검정고시 합격자는 기본 점수가 부여돼요.');
      return;
    }

    if (
      (form.education.graduationType === 'EXPECTED' ||
        form.education.graduationType === 'GRADUATED') &&
      currentStep === '성적 입력' &&
      (step === '출결상황' || step === '봉사시간' || step === '자격증')
    ) {
      const hasEmptyAchievementLevel = form.grade.subjectList.some(
        (subject) =>
          subject.achievementLevel21 === '-' ||
          subject.achievementLevel22 === '-' ||
          subject.achievementLevel31 === '-'
      );

      if (hasEmptyAchievementLevel) {
        alert('성적 미입력 값이 있어요. 성적을 모두 입력해야 정확한 계산이 가능해요.');
      }
    }

    setCurrentStep(step);
  };

  return { handleMoveStep, currentStep };
};
