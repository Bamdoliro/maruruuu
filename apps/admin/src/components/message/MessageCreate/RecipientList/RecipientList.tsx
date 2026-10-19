import { Text } from '@maru/ui';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useMessageRecipientListQuery } from '@/services/message/queries';
import type { RecipientType } from '@/types/message/client';

interface RecipientListProps {
  recipient: RecipientType;
}

const RecipientList = ({ recipient }: RecipientListProps) => {
  const {
    data: recipientList,
    isLoading,
    isError,
  } = useMessageRecipientListQuery(recipient);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Text fontType="p2" color={color.gray500}>
          불러오는 중...
        </Text>
      );
    }
    if (isError) {
      return (
        <Text fontType="p2" color={color.red}>
          받는 사람 목록을 불러오지 못했습니다.
        </Text>
      );
    }
    if (!recipientList?.length) {
      return (
        <Text fontType="p2" color={color.gray500}>
          메시지를 받을 사람이 없습니다.
        </Text>
      );
    }

    return (
      <StyledList>
        {recipientList.map(({ id, name, school }) => (
          <StyledItem key={id}>
            <Text fontType="p2" color={color.gray900}>
              {name}
            </Text>
            <Text fontType="p3" color={color.gray600}>
              {school ?? '-'}
            </Text>
          </StyledItem>
        ))}
      </StyledList>
    );
  };

  return (
    <StyledRecipientList>
      <StyledHeader>
        <Text fontType="H5" color={color.gray900}>
          받는 사람
        </Text>
        {recipientList && (
          <Text fontType="p3" color={color.gray600}>
            총 {recipientList.length}명
          </Text>
        )}
      </StyledHeader>
      {renderContent()}
    </StyledRecipientList>
  );
};

export default RecipientList;

const StyledRecipientList = styled.div`
  ${flex({ flexDirection: 'column' })}
  flex-shrink: 0;
  gap: 16px;
  width: 320px;
  max-height: 600px;
  padding: 24px;
  border: 1px solid ${color.gray200};
  border-radius: 12px;
`;

const StyledHeader = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
`;

const StyledList = styled.ul`
  ${flex({ flexDirection: 'column' })}
  overflow-y: auto;
`;

const StyledItem = styled.li`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${color.gray100};

  &:last-of-type {
    border-bottom: none;
  }
`;
