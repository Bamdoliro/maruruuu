import { useFairExportExcelQuery } from '@/services/fair/queries';

export const useExportExcelAction = (id: number) => {
  const { data: exportExcelData } = useFairExportExcelQuery(id);

  const handleExportExcelButtonClick = (title: string) => {
    if (!exportExcelData) return;
    const excelUrl = window.URL.createObjectURL(new Blob([exportExcelData]));

    const link = document.createElement('a');
    link.href = excelUrl;
    const sanitizedTitle = title.replace(/\s+/g, '_');
    link.download = `${sanitizedTitle}_입학설명회_신청자_명단.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(excelUrl);
  };

  return { handleExportExcelButtonClick };
};
