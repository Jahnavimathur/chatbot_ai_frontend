'use client';

import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { documentService } from '../../../lib/services/document.service';
import { Document } from '../../../types';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const docs = await documentService.getDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error('Failed to fetch documents', err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await documentService.uploadDocument(file);
      setFile(null);
      await fetchDocuments();
    } catch (err) {
      console.error('Upload error', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full h-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Knowledge Base</h1>
        <p className="text-slate-400">Upload documents to enrich the AI's understanding.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-dashed border-indigo-500/30 bg-indigo-500/5 flex flex-col items-center justify-center text-center transition-all hover:bg-indigo-500/10">
        <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
          <UploadCloud className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Upload a Document</h3>
        <p className="text-sm text-slate-400 max-w-sm mb-6">
          Drag and drop your files here, or click to browse. Supported formats: .txt, .pdf, .md
        </p>
        
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 px-5 rounded-xl transition-all shadow-md">
            <span>Select File</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".txt,.pdf,.md"
            />
          </label>
        </div>
        
        {file && (
          <div className="mt-6 flex items-center gap-4 bg-slate-900/80 px-4 py-3 rounded-xl border border-white/5 w-full max-w-md">
            <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-sm text-slate-300 truncate flex-1">{file.name}</span>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium py-1.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center gap-2"
            >
              {uploading ? (
                <><Loader2 className="w-3 h-3 animate-spin"/> Uploading...</>
              ) : 'Upload'}
            </button>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Indexed Documents</h2>
        {documents.length === 0 ? (
          <div className="text-slate-500 text-sm italic p-4 border border-white/5 rounded-xl">
            No documents uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="glass-panel p-4 rounded-2xl flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Indexed
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-200 truncate" title={doc.filename}>{doc.filename}</h4>
                  <p className="text-xs text-slate-500 mt-1">Uploaded {new Date(doc.upload_date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
