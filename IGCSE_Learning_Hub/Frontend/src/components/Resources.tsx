import { Upload, FileText } from 'lucide-react';
import { useState } from 'react';

export function Resources() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">    Tài liệu học tập</h2>

      <label className="block mb-6 cursor-pointer">
        <div className="p-6 border-2 border-dashed rounded-lg text-center hover:bg-purple-50">
          <Upload className="mx-auto mb-2 text-purple-600" />
          <p className="text-purple-600 font-medium">
            Tải tài liệu (PDF, DOCX, PPT)
          </p>
        </div>
        <input type="file" multiple hidden onChange={handleUpload} />
      </label>

      <div className="space-y-3">
        {files.map((file, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
            <FileText className="text-blue-600" />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
