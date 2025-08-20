import styled from 'styled-components';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import { Row, Text } from '@maru/ui';
import { IconAnswer, IconArrowBottom, IconArrowTop, IconFaq } from '@maru/icon';

interface FaqItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem = ({ title, content, isOpen, onToggle }: FaqItemProps) => {
  return (
    <StyledFaqItem>
      <QuestionBox onClick={onToggle}>
        <Row alignItems="center" gap={12}>
          <IconBox>
            <IconFaq
              color={isOpen ? color.maruDefault : color.gray400}
              width={24}
              height={24}
            />
          </IconBox>
          <Text fontType="p1" color={color.gray900} whiteSpace="break-spaces">
            {title}
          </Text>
        </Row>
        {isOpen ? (
          <IconArrowTop color={color.gray600} width={24} height={24} />
        ) : (
          <IconArrowBottom color={color.gray600} width={24} height={24} />
        )}
      </QuestionBox>
      {isOpen && (
        <AnswerBox>
          <Row alignItems="flex-start" gap={12}>
            <IconBox>
              <IconAnswer width={24} height={24} color={color.gray400} />
            </IconBox>
            <Text fontType="p2" csolor={color.gray900} whiteSpace="break-spaces">
              {content}
            </Text>
          </Row>
        </AnswerBox>
      )}
    </StyledFaqItem>
  );
};

export default FaqItem;

const StyledFaqItem = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${color.gray300};
`;

const QuestionBox = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  height: fit-content;
  background-color: ${color.white};
  cursor: pointer;
  gap: 10px;
`;

const IconBox = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
`;

const AnswerBox = styled.div``;
