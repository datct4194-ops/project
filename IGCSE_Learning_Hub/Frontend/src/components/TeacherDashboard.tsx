import { Users, FileText, Upload, MessageSquare, TrendingUp, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { User } from '../App';
import { useState} from 'react';
import { DashboardLayout } from './DashboardLayout';
import { DashboardTab } from './DashboardLayout';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void; 
}
export function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const students = [
    { id: 1, name: 'Nguyễn Văn A', progress: 85, status: 'Tốt', needsAttention: false },
    { id: 2, name: 'Trần Thị B', progress: 92, status: 'Xuất sắc', needsAttention: false },
    { id: 3, name: 'Lê Văn C', progress: 45, status: 'Cần hỗ trợ', needsAattention: true },
    { id: 4, name: 'Phạm Thị D', progress: 78, status: 'Khá', needsAttention: false },
  ];

  const resources = [
    { id: 1, title: 'Bài giảng Đại số - Chương 3', type: 'PDF', date: '15/01/2026' },
    { id: 2, title: 'Video: Giải phương trình', type: 'Video', date: '14/01/2026' },
    { id: 3, title: 'Đề kiểm tra giữa kỳ', type: 'Quiz', date: '12/01/2026' },
  ];

  const feedbackPending = [
    { id: 1, student: 'Nguyễn Văn A', assignment: 'Bài tập Logarit', submitted: '1 giờ trước' },
    { id: 2, student: 'Trần Thị B', assignment: 'Kiểm tra Hình học', submitted: '3 giờ trước' },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      roleLabel="Giáo viên"
      roleColor="from-purple-600 to-purple-700"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Chào mừng, Giáo viên {user.name}!
        </h2>
        <p className="text-gray-600">Quản lý học sinh và tài liệu học tập</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">48</span>
          </div>
          <p className="text-sm text-gray-600">Tổng học sinh</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">24</span>
          </div>
          <p className="text-sm text-gray-600">Tài liệu đã tải lên</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <p className="text-sm text-gray-600">Phản hồi chờ xử lý</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">87%</span>
          </div>
          <p className="text-sm text-gray-600">Tỷ lệ hoàn thành TB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Monitoring */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Giám sát học sinh</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-500">{student.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {student.needsAttention ? (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    <span className="text-sm font-semibold text-purple-600">{student.progress}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      student.needsAttention ? 'bg-orange-500' : 'bg-purple-600'
                    }`}
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Feedback */}
        <div className="space-y-6">
          {/* Upload Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tải tài liệu lên</h3>
            <button className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-600">Tải tài liệu mới</p>
            </button>
            <div className="mt-4 space-y-3">
              {resources.slice(0, 2).map((resource) => (
                <div key={resource.id} className="text-sm">
                  <p className="font-medium text-gray-900 truncate">{resource.title}</p>
                  <p className="text-gray-500">{resource.type} • {resource.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Feedback */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chờ phản hồi</h3>
            <div className="space-y-3">
              {feedbackPending.map((item) => (
                <div key={item.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{item.student}</p>
                  <p className="text-xs text-gray-600">{item.assignment}</p>
                  <p className="text-xs text-orange-600 mt-1">{item.submitted}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
