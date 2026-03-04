import { UploadResponse } from "@/@types/upload.type";
import { uploadServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useMutation } from "@tanstack/react-query";

const fetch = async (file: File): Promise<UploadResponse> => {
  try {
    const results = await uploadServices(file);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useUpload = () => {
  return useMutation({
    mutationFn: (file: File) => fetch(file),
  });
};
