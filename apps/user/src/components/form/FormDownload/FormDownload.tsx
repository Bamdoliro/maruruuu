import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import styled from '@emotion/styled';

interface FormDownloadProps {
  onClick: () => void;
}

const FormDownload = ({ onClick }: FormDownloadProps) => {
  return (
    <Column gap={36} alignItems="flex-start">
      <Text fontType="H1" color={color.gray900}>
        원서 최종 제출
      </Text>
      <Text fontType="p2" color={color.gray900}>
        (공통,해당자)제출서류들은 스캔해서 하나의 PDF파일로 업로드 후 우편등기제출
        해주시기 바랍니다.
      </Text>
      <ExportFormButton onClick={onClick}>[ 원서 초안 pdf 다운로드 ]</ExportFormButton>
    </Column>
  );
};

export default FormDownload;

const ExportFormButton = styled.button`
  ${font.p2};
  color: ${color.gray600};
`;
