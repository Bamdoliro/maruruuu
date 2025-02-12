import { formatFileName } from '@/utils';
import { color } from '@maru/design-system';
import { IconClip } from '@maru/icon';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface DownloadButtonProps {
  buttonClick: () => void;
  textClick: () => void;
  fileName: string;
}

const DownloadButton = ({ buttonClick, textClick, fileName }: DownloadButtonProps) => {
  return (
    <StyledDownloadButton>
      <FileDownloadButton onClick={buttonClick}>
        <IconClip width={19} height={12} color={color.gray700} />
        <Text fontType="p3" color={color.gray700}>
          {formatFileName(fileName)}
        </Text>
      </FileDownloadButton>
      {!fileName.endsWith('.hwp') && (
        <FileNowViewButton onClick={textClick}>
          <Text fontType="p2" color={color.maruDefault}>
            [바로보기]
          </Text>
        </FileNowViewButton>
      )}
    </StyledDownloadButton>
  );
};

export default DownloadButton;

const StyledDownloadButton = styled.div`
  ${flex({ flexDirection: 'row', alignItems: 'center' })}
  gap: 12px;
`;

const FileDownloadButton = styled.div`
  ${flex({
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  })};
  gap: 8px;
  height: 36px;
  padding: 0 15px 0 15px;
  border-radius: 999px;
  background: ${color.gray200};
  width: auto;
  min-width: fit-content;
  max-width: fit-content;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background-color: ${color.gray300};
  }
`;

const FileNowViewButton = styled.div`
  cursor: pointer;
`;
