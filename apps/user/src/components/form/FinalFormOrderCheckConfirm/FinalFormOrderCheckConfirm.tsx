import { color, font } from '@maru/design-system';
import { Column, Row, Confirm, Text, CheckBox } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useState } from 'react';

interface FinalFormOrderCheckConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FinalFormOrderCheckConfirm = ({
  isOpen,
  onClose,
  onConfirm,
}: FinalFormOrderCheckConfirmProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Confirm
      height={550}
      isOpen={isOpen}
      title="PDF를 모두 첨부하였는지 확인해주세요."
      content={
        <Column gap={20} style={{ width: '100%' }}>
          <ScrollArea>
            <Section>
              <Text fontType="H5" color={color.gray900}>
                {' '}
                공동 제출{' '}
              </Text>
              <DocumentList>
                <DocumentItem>
                  입학 원서(원서 초안) 1부
                  <NoteList>
                    <Note>3개월 이내 증명사진 스캔 후 입력</Note>
                    <Note $isPoint>
                      인터넷 접수
                      <a href="https://maru.bamdoliro.com/">(maru.bamdoliro.com)</a>후
                      출력하여 출신 중학교장 직인 날인 후 제출
                    </Note>
                  </NoteList>
                </DocumentItem>
                <DocumentItem>
                  자기소개서 및 학업계획서 1부 ([서식2])
                  <NoteList>
                    <Note>
                      인터넷 접수
                      <a href="https://maru.bamdoliro.com/">(maru.bamdoliro.com)</a>후
                      출력
                    </Note>
                  </NoteList>
                </DocumentItem>
                <DocumentItem>
                  학교생활기록부 || 사본 1부
                  <PointList>
                    <Point>원본대조필</Point>
                    <Point>학교장 직인 날인</Point>
                  </PointList>
                  <NoteList>
                    <Note>중졸 검정고시 합격자도 제출</Note>
                  </NoteList>
                </DocumentItem>
                <DocumentItem>서약서 1부 ([서식3])</DocumentItem>
                <DocumentItem>개인정보 수집·이용·제공 동의서 1부</DocumentItem>
                <DocumentItem>
                  봉사활동 확인 서류 1부
                  <NoteList>
                    <Note>
                      학교생활기록부에 기록된 내용과 1365 자원봉사포털, VMS, DOVOL에서
                      참여한 봉사 실적만 인정
                    </Note>
                    <Note>실적에 한함</Note>
                  </NoteList>
                </DocumentItem>
              </DocumentList>
            </Section>
            <Section>
              <Text fontType="H5" color={color.gray900}>
                {' '}
                해당자{' '}
              </Text>
              <DocumentList>
                <DocumentItem>
                  검정고시 합격증명서 1부 및 검정고시 성적증명서 1부 (검정고시 합격자에
                  한함)
                  <NoteList>
                    <Note>정부24 홈페이지, 해당 교육청 및 교육지원청, 행정구청 발급</Note>
                  </NoteList>
                </DocumentItem>
                <DocumentItem>
                  주민등록등본 1부 (검정고시 합격자, 사회통합전형 대상자 등)
                </DocumentItem>
                <DocumentItem>
                  자격증 사본 1부
                  <PointList>
                    <Point>원본대조필</Point>
                  </PointList>
                  <NoteList>
                    <Note>인터넷 출력 시 자격증번호와 발급기관의 직인 필수</Note>
                  </NoteList>
                </DocumentItem>
                <DocumentItem>
                  학교장 추천서 ([서식4])
                  <NoteList>
                    <Note>인터넷 접수 후 출력</Note>
                    <Note>특별전형에 한함</Note>
                  </NoteList>
                </DocumentItem>
              </DocumentList>
            </Section>
          </ScrollArea>
          <label style={{ cursor: 'pointer' }}>
            <Row gap={8} alignItems="center">
              <CheckBox
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <Text fontType="p2" color={color.gray900}>
                모두 첨부하였습니다.
              </Text>
            </Row>
          </label>
        </Column>
      }
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText="확인"
      isConfirmDisabled={!isChecked}
      confirmButtonStyle={
        isChecked
          ? undefined
          : { backgroundColor: color.gray500, color: color.gray300, cursor: 'auto' }
      }
    />
  );
};

export default FinalFormOrderCheckConfirm;

const ScrollArea = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 28px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 12px;
`;

const Section = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 12px;
`;

const DocumentList = styled.ul`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 16px;
  list-style: none;
`;

const DocumentItem = styled.li`
  position: relative;
  padding-left: 14px;
  color: ${color.gray900};
  ${font.context}

  &::before {
    content: '•';
    position: absolute;
    left: 0;
  }
`;

const PointList = styled.ul`
  ${flex({ alignItems: 'center' })}
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 6px;
  list-style: none;
`;

const Point = styled.li`
  padding: 4px 10px;
  border-radius: 8px;
  background-color: ${color.lightRed};
  color: ${color.red};
  ${font.btn3}
`;

const NoteList = styled.ul`
  ${flex({ flexDirection: 'column' })}
  margin-top: 6px;
  gap: 2px;
  list-style: none;
`;

const Note = styled.li<{ $isPoint?: boolean }>`
  position: relative;
  padding-left: 12px;
  color: ${(props) => (props.$isPoint ? color.red : color.gray600)};
  ${font.p3}

  &::before {
    content: '-';
    position: absolute;
    left: 0;
  }
`;
