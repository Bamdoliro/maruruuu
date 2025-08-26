import { color } from '@maru/design-system';
import { Column, Text, Textarea } from '@maru/ui';
import FormController from '../../FormController/FormController';
import { useFormValueStore } from '@/stores';
import { useIntoductionForm } from './IntroductionContent.hook';

const IntroductionContent = () => {
  const { onFieldChange, handleNextStep, handlePreviousStep, errors } =
    useIntoductionForm();
  const form = useFormValueStore();

  return (
    <>
      <Column gap={24}>
        <Text fontType="p3" color={color.red}>
          *자기소개서와 학업계획서는 자동저장됩니다.
        </Text>
        <Column gap={64}>
          <Textarea
            name="coverLetter"
            limit={1000}
            label="자기소개서"
            placeholder="자유롭게 자신의 특성 및 성장과정, 취미·특기, 학교생활, 가족안에서의 역할, 장점과 보완·발전시켜야할 단점에 대하여 서술하십시오. (1000자 이내)"
            value={form.document.coverLetter}
            onChange={onFieldChange}
            isError={!!errors.coverLetter?.length}
            errorMessage={errors.coverLetter ? errors.coverLetter[0] : ''}
          />
          <Textarea
            name="statementOfPurpose"
            limit={1000}
            label="학업계획서"
            placeholder="우리학교를 선택하게 된 구체적인 지원동기와 고등학생이 된 후 이루고자 하는 목표를 달성하기 위해 생각하는 학업계획을 기술하십시오. (1000자 이내)"
            value={form.document.statementOfPurpose}
            onChange={onFieldChange}
            isError={!!errors.statementOfPurpose?.length}
            errorMessage={errors.statementOfPurpose ? errors.statementOfPurpose[0] : ''}
          />
        </Column>
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="자기소개서"
      />
    </>
  );
};

export default IntroductionContent;
