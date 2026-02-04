import { Upload, FileText, Calendar } from 'lucide-react';

export function Assignments() {
  const assignments = [
    {
      id: 1,
      title: 'Bài tập Đại số – Chương 3',
      deadline: '20/01/2026',
      submissions: 32,
    },
    {
      id: 2,
      title: 'Bài tập Hình học – Tam giác',
      deadline: '25/01/2026',
      submissions: 28,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bài tập</h2>
        <p className="text-gray-600">
          Tạo, quản lý và thu bài tập của học sinh
        </p>
      </div>

      {/* Upload Assignment */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Tạo bài tập mới
        </h3>

        <button className="w-full border-2 border-dashed border-purple-300 rounded-xl p-6 text-purple-600 hover:bg-purple-50 transition">
          <Upload className="w-8 h-8 mx-auto mb-2" />
          <p className="font-medium">Tải bài tập lên</p>
          <p className="text-sm text-gray-500 mt-1">
            PDF, Word hoặc link Google Drive
          </p>
        </button>
      </div>

      {/* Assignment List */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Danh sách bài tập
        </h3>

        <div className="space-y-4">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:border-purple-300 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{a.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Hạn nộp: {a.deadline}
                  </div>
                </div>
              </div>

              <span className="text-sm font-medium text-purple-600">
                {a.submissions} bài nộp
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
