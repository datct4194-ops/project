import { BookOpen, Layers, Plus, Edit, Users, TrendingUp, FileText, Video } from 'lucide-react';
import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';

interface ManagerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function ManagerDashboard({ user, onLogout }: ManagerDashboardProps) {
  const courses = [
    { 
      id: 1, 
      name: 'Đại số nâng cao IGCSE', 
      modules: 12, 
      students: 48, 
      completion: 75,
      status: 'Đang hoạt động',
      lastUpdated: '2 ngày trước'
    },
    { 
      id: 2, 
      name: 'Hình học IGCSE', 
      modules: 10, 
      students: 42, 
      completion: 68,
      status: 'Đang hoạt động',
      lastUpdated: '5 ngày trước'
    },
    { 
      id: 3, 
      name: 'Thống kê & Xác suất', 
      modules: 8, 
      students: 35, 
      completion: 82,
      status: 'Đang hoạt động',
      lastUpdated: '1 tuần trước'
    },
    { 
      id: 4, 
      name: 'Giải tích cơ bản', 
      modules: 15, 
      students: 28, 
      completion: 45,
      status: 'Đang phát triển',
      lastUpdated: 'Hôm nay'
    },
  ];

  const contentStats = [
    { type: 'Videos', count: 124, icon: Video, color: 'red' },
    { type: 'Tài liệu', count: 86, icon: FileText, color: 'blue' },
    { type: 'Bài kiểm tra', count: 45, icon: BookOpen, color: 'purple' },
    { type: 'Modules', count: 45, icon: Layers, color: 'green' },
  ];

  const recentUpdates = [
    { id: 1, course: 'Đại số nâng cao', action: 'Thêm 3 video bài giảng mới', time: '2 giờ trước' },
    { id: 2, course: 'Hình học IGCSE', action: 'Cập nhật đề kiểm tra chương 5', time: '1 ngày trước' },
    { id: 3, course: 'Giải tích cơ bản', action: 'Tạo module mới: Đạo hàm', time: '2 ngày trước' },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      roleLabel="Quản lý khóa học"
      roleColor="from-orange-600 to-orange-700"
    >
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Chào mừng, {user.name}!
        </h2>
        <p className="text-gray-600">Quản lý nội dung và khóa học</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {contentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.count}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.type}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Management */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quản lý khóa học</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Tạo khóa học mới</span>
            </button>
          </div>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{course.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'Đang hoạt động' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Layers className="w-4 h-4" />
                        {course.modules} modules
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students} học sinh
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Tiến độ hoàn thành</span>
                    <span className="text-xs font-semibold text-orange-600">{course.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">Cập nhật lần cuối: {course.lastUpdated}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Plus className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Tạo module mới</span>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Video className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Tải video lên</span>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Thêm tài liệu</span>
                </div>
              </button>

              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Tạo bài kiểm tra</span>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cập nhật gần đây</h3>
            <div className="space-y-3">
              {recentUpdates.map((update) => (
                <div key={update.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">{update.course}</p>
                  <p className="text-xs text-gray-600 mb-1">{update.action}</p>
                  <p className="text-xs text-gray-400">{update.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-6 border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">Hiệu suất</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">92%</p>
            <p className="text-sm text-gray-600">Mức độ hài lòng của học sinh</p>
            <p className="text-xs text-green-600 mt-2">+5% so với tháng trước</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
