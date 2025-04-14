import React, { useState } from 'react';
import { color } from '@maru/design-system';
import { Button, CellInput, Column, Input, RadioGroup, Text, Textarea } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useAgree, useCTAButton, useInput } from './FairStudentApplicationBox.hook';
import Link from 'next/link';
import { ROUTES } from '@/constants/common/constants';

interface FairStudentApplicationBoxProps {
  id: number;
}

const FairStudentApplicationBox = ({ id }: FairStudentApplicationBoxProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { application, handleApplicationChange, handleApplicationTextAreaChange } =
    useInput();
  const { handleSendFairApplication } = useCTAButton(id, application);
  const { agree, handleAgreeChange, handleButtonClick } = useAgree(
    handleSendFairApplication
  );

  const handleClick = () => {
    setIsSubmitted(true);
    handleButtonClick();
  };

  return (
    <div>
      <Column gap={120}>
        <Column gap={64}>
          <Input
            label={
              <>
                소속학교{' '}
                <Text fontType="context" color={color.red}>
                  *
                </Text>
              </>
            }
            width={384}
            name="schoolName"
            onChange={handleApplicationChange}
            errorMessage="소속학교를 입력해주세요."
            isError={isSubmitted && application.schoolName === ''}
          />
          <Input
            label={
              <>
                성함{' '}
                <Text fontType="context" color={color.red}>
                  *
                </Text>
              </>
            }
            width={384}
            onChange={handleApplicationChange}
            name="name"
            errorMessage="성함을 입력해주세요."
            isError={isSubmitted && application.name === ''}
          />
          <CellInput
            name="headcount"
            count="명"
            label={
              <>
                참석 인원{' '}
                <Text fontType="context" color={color.red}>
                  *
                </Text>
              </>
            }
            onChange={handleApplicationChange}
            value={application.headcount ?? 0}
            errorMessage="참석 인원을 입력해주세요."
            isError={isSubmitted && application.headcount === null}
          />
          <RadioGroup
            name="type"
            label={
              <>
                신청 유형{' '}
                <Text fontType="context" color="red">
                  *
                </Text>
              </>
            }
            items={[
              { value: '학생', label: '학생' },
              { value: '학부모', label: '학부모' },
              { value: '기타', label: '기타' },
            ]}
            onChange={handleApplicationChange}
            value={application.type}
          />
          <Input
            label={
              <>
                연락처 (전화번호){' '}
                <Text fontType="context" color={color.red}>
                  *
                </Text>
              </>
            }
            width={384}
            onChange={handleApplicationChange}
            name="phoneNumber"
            errorMessage="연락처를 입력해주세요."
            isError={isSubmitted && application.phoneNumber === ''}
          />
          <Textarea
            name="question"
            label={
              <>
                <Text fontType="context" color={color.gray700}>
                  입학설명회에서 특별히 궁금한 부분이 있으시면 자유롭게 작성해 주세요.
                </Text>
              </>
            }
            placeholder="255자 이내로 작성해주세요."
            onChange={handleApplicationTextAreaChange}
            limit={255}
            value={application.question}
            width={816}
          />
        </Column>
        <Column gap={36}>
          <PrivacyConcert>
            <Text fontType="H4" color={color.gray900}>
              개인정보 동의서
            </Text>
            <Text fontType="p2" color={color.gray600} tag="p">
              입학설명회 진행을 위해 수집한 개인정보는 부산소프트웨어마이스터고등학교
              <br />
              홍보자료 발송 및 입학안내 이외의 용도로 사용되지 않습니다.
              <br />
              <Link href={ROUTES.PRIVACY_POLCY} style={{ color: color.maruDefault }}>
                [개인정보처리방침]
              </Link>{' '}
              제 1조, 제 2조에 따라 개인정보를 수집, 이용 및 제공하는 것을 동의합니다.
              <br />
              또한 개인정보를 다음과 같이 보관하며, 수집, 이용 및 제공목적이 달성된 경우
              <Link href={ROUTES.PRIVACY_POLCY} style={{ color: color.maruDefault }}>
                [개인정보처리방침]
              </Link>{' '}
              제 6조에 따라 처리합니다.
              <br />
              단, 개인정보 비동의 시 홍보자료 및 안내자료 발송에 제한이 있습니다.
            </Text>
          </PrivacyConcert>
          <RadioGroup
            name="agree"
            items={[
              { value: 'agree', label: '동의' },
              { value: 'disagree', label: '비동의' },
            ]}
            value={agree ?? ''}
            onChange={(e) => handleAgreeChange(e.target.value)}
          />
        </Column>
        <Button size="LARGE" width={200} onClick={handleClick}>
          제출하기
        </Button>
      </Column>
    </div>
  );
};

export default FairStudentApplicationBox;

const PrivacyConcert = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  gap: 16px;
`;
