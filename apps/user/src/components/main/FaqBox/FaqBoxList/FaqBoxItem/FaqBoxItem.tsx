import { ROUTES } from '@/constants/common/constants';
import { color, font } from '@maru/design-system';
import { IconFaq } from '@maru/icon';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

interface FaqBoxItemProps {
  title: string;
}

const FaqBoxItem = ({ title }: FaqBoxItemProps) => {
  const router = useRouter();

  const handleMoveFaq = () => {
    router.push(ROUTES.FAQ);
  };

  return (
    <StyledFaqBoxItem onClick={handleMoveFaq}>
      <IconFaq width={24} height={34} color={color.maruDefault} />
      <Question>{title}</Question>
    </StyledFaqBoxItem>
  );
};

export default FaqBoxItem;

const StyledFaqBoxItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 64px;
  padding: 0px 16px;
  border-bottom: 1px solid ${color.gray300};
  cursor: pointer;
`;

const Question = styled.a`
  ${font.p1}
  color: ${color.gray750};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 12px;
`;
