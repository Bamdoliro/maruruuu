import { useExportSecondScoreFormatQuery } from '@/services/form/queries';

export const useExportExcelAction = () => {
  const { data: secondScoreFormatData } = useExportSecondScoreFormatQuery();

  const handleExportSecondScoreFormatButtonClick = () => {
    if (!secondScoreFormatData) return;
    const excelUrl = window.URL.createObjectURL(new Blob([secondScoreFormatData]));

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = '2차 전형 점수 양식.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(excelUrl);
  };

  return { handleExportSecondScoreFormatButtonClick };
};
