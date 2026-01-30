import { color } from '@maru/design-system';
import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

interface CategoryProps {
  selectedTab: string;
  handleTabClick: (tab: string) => void;
}

const CATEGORY_LIST = [
  {
    name: '진행 중인 신청',
  },
  {
    name: '마감된 신청',
  },
];

const FairCategory = ({ selectedTab, handleTabClick }: CategoryProps) => {
  return (
    <StyledFairCategory>
      {CATEGORY_LIST.map(({ name }, index) => (
        <UnderlineButton
          key={`category ${index}`}
          active={name === selectedTab}
          onClick={() => handleTabClick(name)}
        >
          {name}
        </UnderlineButton>
      ))}
    </StyledFairCategory>
  );
};

export default FairCategory;

const StyledFairCategory = styled.div`
  ${flex({ flexDirection: 'row', alignItems: 'center' })}
  width: 100%;
  background-color: ${color.white};
  margin-top: 36px;
  margin-bottom: 36px;
`;
