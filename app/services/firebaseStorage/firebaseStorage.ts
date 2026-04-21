import httpClient from 'services/api/httpClient';
import { BASE_URL_IMAGES } from 'constants/env/envConstants';

export const getImageUrl = (imageId: string) => `${BASE_URL_IMAGES}/${imageId}`;

export const uploadImage = async ({
  fileName = '',
  filePath = '',
  mimeType = 'image/jpeg',
}: UploadImageParams): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append('file', { uri: filePath, name: fileName, type: mimeType } as any);
  formData.append('name', fileName);
  formData.append('category', 'customQuizzes');

  const { data } = await httpClient.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data as ImageUploadResponse;
};

interface UploadImageParams {
  fileName?: string;
  filePath?: string;
  mimeType?: string;
}

interface ImageUploadResponse {
  id: string;
  url: string;
  name: string;
  category: string;
  mimeType: string;
}
