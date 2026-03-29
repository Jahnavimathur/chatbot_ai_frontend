import { fetchApi } from '../api';
import { Document } from '../../types';

export const documentService = {
  async uploadDocument(file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    return fetchApi<Document>('/documents/upload', {
      method: 'POST',
      body: formData,
    });
  },

  async getDocuments(): Promise<Document[]> {
    return fetchApi<Document[]>('/documents', {
      method: 'GET',
    });
  },
};
