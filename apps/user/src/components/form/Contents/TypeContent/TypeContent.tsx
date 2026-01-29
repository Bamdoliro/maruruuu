import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { Column, Radio, Row, Td } from '@maru/ui';
import TypeHeader from './TypeHeader/TypeHeader';
import FormController from '../../FormController/FormController';
import { useCTAButton, useRadio } from './TypeContent.hook';
import { useFormValueStore } from '@/stores';

const TypeContent = () => {
  const form = useFormValueStore();
  const { handleNextStep, handlePreviousStep } = useCTAButton();
  const { handleFormTypeChange } = useRadio();

  return (
    <StyledTypeContent>
      <TypeHeader />
      <Row>
        <Td width="30%" height={56} isBottom={true} isLeft={true}>
          일반 전형
        </Td>
        <Td width="30%" height={56} isBottom={true}>
          일반 전형
        </Td>
        <Td width="30%" height={56} isBottom={true}>
          {null}
        </Td>
        <Td width="10%" height={56} isBottom={true} isRight={true}>
          <Radio
            name="type"
            value="REGULAR"
            onChange={handleFormTypeChange}
            checked={form.type === 'REGULAR'}
          />
        </Td>
      </Row>
      <Row>
        <Td width="30%" height={560} isBottom={true} isLeft={true}>
          특별 전형
        </Td>
        <Column width="30%">
          <Td width="100%" height={56} isBottom={true}>
            마이스터 인재전형
          </Td>
          <Td width="100%" height={280} isBottom={true}>
            기회균등 전형
          </Td>
          <Td width="100%" height={224} isBottom={true}>
            사회다양성 전형
          </Td>
        </Column>
        <Column width="30%">
          <Td width="100%" height={56} isBottom={true}>
            {null}
          </Td>
          <Td width="100%" height={56}>
            국민기초생활수급자
          </Td>
          <Td width="100%" height={56}>
            차상위계층
          </Td>
          <Td width="100%" height={56}>
            국가보훈대상자 (국가유공자)
          </Td>
          <Td width="100%" height={56}>
            한부모가정보호대상자
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            북한이탈주민 또는 그 자녀
          </Td>
          <Td width="100%" height={56}>
            다문화가정 자녀
          </Td>
          <Td width="100%" height={56}>
            소년 · 소녀가장
          </Td>
          <Td width="100%" height={56}>
            다자녀 가정 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            농어촌지역출신자
          </Td>
        </Column>
        <Column width="10%">
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="MEISTER_TALENT"
              onChange={handleFormTypeChange}
              checked={form.type === 'MEISTER_TALENT'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="NATIONAL_BASIC_LIVING"
              onChange={handleFormTypeChange}
              checked={form.type === 'NATIONAL_BASIC_LIVING'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="NEAR_POVERTY"
              onChange={handleFormTypeChange}
              checked={form.type === 'NEAR_POVERTY'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="NATIONAL_VETERANS"
              onChange={handleFormTypeChange}
              checked={form.type === 'NATIONAL_VETERANS'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="ONE_PARENT"
              onChange={handleFormTypeChange}
              checked={form.type === 'ONE_PARENT'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="FROM_NORTH_KOREA"
              onChange={handleFormTypeChange}
              checked={form.type === 'FROM_NORTH_KOREA'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="MULTICULTURAL"
              onChange={handleFormTypeChange}
              checked={form.type === 'MULTICULTURAL'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="TEEN_HOUSEHOLDER"
              onChange={handleFormTypeChange}
              checked={form.type === 'TEEN_HOUSEHOLDER'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="MULTI_CHILDREN"
              onChange={handleFormTypeChange}
              checked={form.type === 'MULTI_CHILDREN'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="FARMING_AND_FISHING"
              onChange={handleFormTypeChange}
              checked={form.type === 'FARMING_AND_FISHING'}
            />
          </Td>
        </Column>
      </Row>
      <Row>
        <Td
          width="calc(736px/3)"
          height={112}
          borderBottomLeftRadius={12}
          isBottomBold={true}
          isLeft={true}
        >
          전형 외 전형
        </Td>
        <Column width="30%">
          <Td width="100%" height={56}>
            {null}
          </Td>
          <Td width="100%" height={56} isBottomBold={true}>
            {null}
          </Td>
        </Column>
        <Column width="30%">
          <Td width="100%" height={56}>
            국가보훈대상자 중 교육지원대상자
          </Td>
          <Td width="100%" height={56} isBottomBold={true}>
            특례입학 대상자
          </Td>
        </Column>
        <Column width="10%">
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="NATIONAL_VETERANS_EDUCATION"
              onChange={handleFormTypeChange}
              checked={form.type === 'NATIONAL_VETERANS_EDUCATION'}
            />
          </Td>
          <Td
            width="100%"
            height={56}
            isBottomBold={true}
            isRight={true}
            borderBottomRightRadius={12}
          >
            <Radio
              name="type"
              value="SPECIAL_ADMISSION"
              onChange={handleFormTypeChange}
              checked={form.type === 'SPECIAL_ADMISSION'}
            />
          </Td>
        </Column>
      </Row>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="전형선택"
      />
    </StyledTypeContent>
  );
};

export default TypeContent;

const StyledTypeContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
`;
