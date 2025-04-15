import DataBox from '@/components/common/DataBox/DataBox';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface DocumentInfoProps {
  documentData?: {
    coverLetter: string;
    statementOfPurpose: string;
  };
}

const DocumentInfo = ({ documentData }: DocumentInfoProps) => {
  if (!documentData) return <Loader />;

  const documentDetails = [
    { label: '자기소개서', data: documentData.coverLetter },
    { label: '학업계획서', data: documentData.statementOfPurpose },
  ];

  return (
    <StyledDocumentInfo>
      {documentDetails.map((item, index) => (
        <DataBox key={index} label={item.label} data={item.data} lengthType="LONG" />
      ))}
    </StyledDocumentInfo>
  );
};

export default DocumentInfo;

const StyledDocumentInfo = styled.div`
  ${flex({ flexDirection: 'column' })}
  padding: 48px 0;
  gap: 24px;
`;
