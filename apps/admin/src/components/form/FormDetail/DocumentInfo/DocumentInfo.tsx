import DataBox from '@/components/common/DataBox/DataBox';
import { useFormDetailQuery } from '@/services/form/queries';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface DocumentInfoProps {
  id: number;
}

const DocumentInfo = ({ id }: DocumentInfoProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const documentDetails = [
    { label: '자기소개서', data: formDetailData.document.coverLetter },
    { label: '학업계획서', data: formDetailData.document.statementOfPurpose },
  ];

  return (
    <StyledDocumentInfo>
      {documentDetails.map((item, index) => (
        <DataBox key={index} label={item.label} data={item.data}/>
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
