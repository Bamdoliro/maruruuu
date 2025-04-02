import { color, font } from '@maru/design-system';
import { IconAnswer, IconArrowBottom, IconArrowTop, IconFaq } from '@maru/icon';
import { Row } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

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
          <IconFaq
            color={isOpen ? color.maruDefault : color.gray400}
            width={24}
            height={24}
          />
          <Question>{title}</Question>
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
            <IconAnswer width={24} height={24} color={color.gray400} />
            <Answer>{content}</Answer>
          </Row>
        </AnswerBox>
      )}
    </StyledFaqItem>
  );
};

export default FaqItem;

const StyledFaqItem = styled.div`
  width: 100%;
  border-bottom: 1px solid ${color.gray300};
`;

const QuestionBox = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  height: fit-content;
  min-height: 77px;
  padding: 0 24px;
  background-color: ${color.white};
  cursor: pointer;
`;

const AnswerBox = styled.div``;

const Question = styled.p`
  ${font.p1}
  color: ${color.gray900};
`;

const Answer = styled.p`
  ${font.p2};
  color: ${color.gray900};
  width: calc(100%);
  margin-top: 2px;
`;
