import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import type { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { SCHEDULE } from '@/constants/common/constants';
import { formatYear } from '@/utils';

const FinalFormTable = () => {
  const volunteerEndYear = formatYear(SCHEDULE.원서_접수);
  const volunteerStartYear = formatYear(SCHEDULE.원서_접수.subtract(2, 'year'));

  return (
    <StyledFinalFormTable>
      <thead>
        <Tr>
          <Th style={{ borderTopLeftRadius: '12px' }} width={120}>
            지원 구분
          </Th>
          <Th style={{ borderTopRightRadius: '12px' }} width={696}>
            제출 서류
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td width={120}>공동 제출</Td>
          <Td width={696}>
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
                    <a href="https://maru.bamdoliro.com/">(maru.bamdoliro.com)</a>후 출력
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
                  <Note>
                    {volunteerStartYear}.3.1. ~ {volunteerEndYear}.9.30. 실적에 한함
                  </Note>
                </NoteList>
              </DocumentItem>
            </DocumentList>
          </Td>
        </Tr>
        <Tr>
          <Td style={{ borderBottomLeftRadius: '12px' }} width={120}>
            해당자
          </Td>
          <Td style={{ borderBottomRightRadius: '12px' }} width={696}>
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
          </Td>
        </Tr>
      </tbody>
    </StyledFinalFormTable>
  );
};

export default FinalFormTable;

const StyledFinalFormTable = styled.table`
  width: 816px;
  border-radius: 12px;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  ${flex({ alignItems: 'stretch' })}
`;

const Th = styled.th<{ width: CSSProperties['width'] }>`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: ${(props) => props.width};
  height: 56px;
  border: 1px solid ${color.gray300};
  background-color: ${color.gray50};
  color: ${color.gray900};
  ${font.context}
`;

const Td = styled.td<{ width: CSSProperties['width'] }>`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: ${(props) => props.width};
  min-height: 328px;
  border: 1px solid ${color.gray300};
  background-color: ${color.white};
  color: ${color.gray900};
  ${font.form}
`;

const DocumentList = styled.ul`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  padding: 28px 40px;
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
