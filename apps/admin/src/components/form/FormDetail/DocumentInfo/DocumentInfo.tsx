import DataBox from '@/components/common/DataBox/DataBox';
import { Column, Loader } from '@maru/ui';

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
    <Column gap={24}>
      {documentDetails.map((item, index) => (
        <DataBox key={index} label={item.label} data={item.data} lengthType="LONG" />
      ))}
    </Column>
  );
};

export default DocumentInfo;
