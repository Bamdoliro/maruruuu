import { ROUTES } from '@/constants/common/constant';
import { color } from '@maru/design-system';
import { Button, Row, UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

const NAVIGATION_LIST = [
  {
    name: '진행 중인 신청',
  },
  {
    name: '마감된 신청',
  },
];

interface FairListHeaderProps {
  selectedTab: string;
  handleTabClick: (name: string) => void;
}

const FairListHeader = ({ selectedTab, handleTabClick }: FairListHeaderProps) => {
  const router = useRouter();

  const handleMoveFairCreatePage = () => {
    router.push(ROUTES.FAIR_CREATE);
  };

  return (
    <StyledFairListHeader>
      <Row>
        {NAVIGATION_LIST.map(({ name }) => (
          <UnderlineButton
            key={`navigation ${name}`}
            active={name === selectedTab}
            onClick={() => handleTabClick(name)}
          >
            {name}
          </UnderlineButton>
        ))}
      </Row>
      <Button onClick={handleMoveFairCreatePage} icon="ADD_ICON">
        입학 설명회 생성
      </Button>
    </StyledFairListHeader>
  );
};

export default FairListHeader;

const StyledFairListHeader = styled.div`
  width: 100%;
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  background-color: ${color.white};
`;
