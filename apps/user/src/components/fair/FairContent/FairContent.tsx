import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import FairList from '../FairList/FairList';
import { styled } from 'styled-components';

interface FairContentProps {
  category: string;
}

const FairContent = ({ category }: FairContentProps) => {
  return (
    <>
      {category === '진행 중인 신청' && (
        <>
          <Column gap={16}>
            <Text fontType="H3" color={color.gray900}>
              학생
            </Text>
            <FairList
              fairType="STUDENT_AND_PARENT"
              status={['APPLICATION_IN_PROGRESS', 'APPLICATION_NOT_STARTED']}
            />
          </Column>
          <Separator />
          <Column gap={16}>
            <Text fontType="H3" color={color.gray900}>
              교사
            </Text>
            <FairList fairType="TEACHER" status={['APPLICATION_IN_PROGRESS', 'APPLICATION_NOT_STARTED']} />
          </Column>
        </>
      )}
      {category === '마감된 신청' && (
        <>
          <Column gap={16}>
            <Text fontType="H3" color={color.gray900}>
              학생
            </Text>
            <FairList
              fairType="STUDENT_AND_PARENT"
              status={['APPLICATION_CLOSED', 'APPLICATION_EARLY_CLOSED']}
            />
          </Column>
          <Separator />
          <Column gap={16}>
            <Text fontType="H3" color={color.gray900}>
              교사
            </Text>
            <FairList
              fairType="TEACHER"
              status={['APPLICATION_CLOSED', 'APPLICATION_EARLY_CLOSED']}
            />
          </Column>
        </>
      )}
    </>
  );
};

export default FairContent;

const Separator = styled.p`
  border: 1px solid ${color.gray200};
  margin: 2% 0;
  width: 100%;
  max-width: 830px;
  margin-top: 56px;
  margin-bottom: 56px;
`;
