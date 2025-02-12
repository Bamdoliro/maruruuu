export interface NoticeList {
  id: number;
  title: string;
  updatedAt: string;
}

export interface NoticeDetail {
  title: string;
  content: string;
  fileList?: Array<{ downloadUrl: string; filName: string }>;
  createdAt: string;
  updatedAt: string;
}
