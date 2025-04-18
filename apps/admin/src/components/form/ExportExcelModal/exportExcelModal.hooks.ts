import { useExportExcelQuery } from '@/services/form/queries';
import type { ExportExcelType } from '@/types/form/client';

export const useExportExcelAction = (exportExcelType: ExportExcelType) => {
  const { data: exportExcelData } = useExportExcelQuery(exportExcelType);

  const handleExportExcelButtonClick = () => {
    if (!exportExcelData) return;
    const excelUrl = window.URL.createObjectURL(new Blob([exportExcelData]));

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = `${exportExcelType}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(excelUrl);
  };

  return { handleExportExcelButtonClick };
};
