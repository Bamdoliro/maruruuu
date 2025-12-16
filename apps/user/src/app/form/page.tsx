'use client';

import { FormWrapper } from '@/components/common';
import { SwitchCase } from '@toss/react';
import ApplicantInformation from './ApplicantInformation/ApplicantInformation';
import { useFormStepValueStore } from '@/stores';
import GuardianInformation from './GuardianInformation/GuardianInformation';
import Education from './Education/Education';
import Type from './Type/Type';
import Grade from './Grade/Grade';
import Introduction from './Introduction/Introduction';
import DraftCompleted from './DraftCompleted/DraftCompleted';
import DraftSubmissionCompleted from './DraftSubmissionCompleted/DraftSubmissionCompleted';
import FinalSubmission from './FinalSubmission/FinalSubmission';
import FinalSubmissionCompleted from './FinalSubmissionCompleted/FinalSubmissionCompleted';
import { usePageAccessGuard } from '@/hooks';
import { SCHEDULE } from '@/constants/common/constants';

const Form = () => {
  usePageAccessGuard({
    period: { start: SCHEDULE.원서_접수, end: SCHEDULE.원서_접수_마감 },
    title: '원서 접수 기간이 아닙니다',
    content:
      '원서 접수 기간에만 원서 작성이 가능합니다.\n원서 접수 기간까지 조금만 기다려 주세요.',
  });

  const formStep = useFormStepValueStore();

  return (
    <FormWrapper>
      <SwitchCase
        value={formStep}
        caseBy={{
          지원자정보: <ApplicantInformation />,
          보호자정보: <GuardianInformation />,
          출신학교및학력: <Education />,
          전형선택: <Type />,
          성적입력: <Grade />,
          자기소개서: <Introduction />,
          초안작성완료: <DraftCompleted />,
          초안제출완료: <DraftSubmissionCompleted />,
          최종제출: <FinalSubmission />,
          최종제출완료: <FinalSubmissionCompleted />,
        }}
        defaultComponent={<ApplicantInformation />}
      />
    </FormWrapper>
  );
};

export default Form;
