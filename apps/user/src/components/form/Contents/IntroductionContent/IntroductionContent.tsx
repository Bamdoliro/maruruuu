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
            placeholder="1000자 이내로 작성해주세요."
            value={form.document.coverLetter}
            onChange={onFieldChange}
            isError={!!errors.coverLetter?.length}
            errorMessage={errors.coverLetter ? errors.coverLetter[0] : ''}
          />
          <Textarea
            name="statementOfPurpose"
            limit={1000}
            label="학업계획서"
            placeholder="1000자 이내로 작성해주세요."
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
