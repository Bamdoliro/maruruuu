export interface Notice {
  id: number;
  title: string;
  updatedAt: string;
}

export interface NoticeDetail {
  title: string;
  content: string;
  fileList?: Array<{
    downloadUrl: string;
    fileName: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeInput {
  title: string;
  content: string;
  fileNameList?: Array<string> | null;
}

export interface NoticeFileUrl {
  uploadUrl: string;
  downloadUrl: string;
}

export interface NoticeFileData {
  url: NoticeFileUrl;
  fileName: string;
  type: string;
}
