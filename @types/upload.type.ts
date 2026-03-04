import { HttpStatusCode } from "axios";

export interface UploadVersionInfo {
  id: string;
  name: string;
}

export interface UploadFileData {
  fileId: string;
  name: string;
  size: number;
  versionInfo: UploadVersionInfo;
  filePath: string;
  url: string;
  fileType: string;
  height: number;
  width: number;
  thumbnailUrl: string;
  AITags: unknown[] | null;
  description: string | null;
}

export interface UploadResponse {
  status: HttpStatusCode;
  message: string;
  data: UploadFileData | null;
  meta: null;
  errors: null;
}
