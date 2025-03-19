import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

function App() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    // For now, we'll use the static list until files are uploaded
    setFiles(Array.from({ length: 10 }, (_, i) => `${i + 1}.pkt`));
  }, []);

  const handleDownload = async (fileName: string) => {
    try {
      const response = await fetch(`/files/${fileName}`);
      if (!response.ok) throw new Error('File not found');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('File not available yet. Please upload the file first.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Download Files
        </h1>
        <div className="mb-8 text-center text-gray-600">
          Upload your .pkt files to the <code className="bg-gray-100 px-2 py-1 rounded">/public/files</code> folder
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((fileName) => (
            <button
              key={fileName}
              onClick={() => handleDownload(fileName)}
              className="flex items-center justify-center gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <Download className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">{fileName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;