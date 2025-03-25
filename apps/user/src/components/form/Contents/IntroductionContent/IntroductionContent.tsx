import { color } from '@maru/design-system';
import { Column, Text, Textarea } from '@maru/ui';
import FormController from '../../FormController/FormController';
import { useCTAButton, useTextArea } from './IntroductionContent.hook';
import { useFormValueStore } from '@/stores';

const IntroductionContent = () => {
  const { handleNextStep, handlePreviousStep } = useCTAButton();
  const { handleIntoductionChange } = useTextArea();
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
            onChange={handleIntoductionChange}
          />
          <Textarea
            name="statementOfPurpose"
            limit={1000}
            label="학업계획서"
            placeholder="1000자 이내로 작성해주세요."
            value={form.document.statementOfPurpose}
            onChange={handleIntoductionChange}
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
