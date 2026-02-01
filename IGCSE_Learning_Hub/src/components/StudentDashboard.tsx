import { Trophy, Calendar, BarChart3, Calculator, Brain, Target, BookOpen, CheckCircle } from 'lucide-react';
import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const modules = [
    { id: 1, name: 'Đại số', progress: 75, lessons: 12, completed: 9, icon: Calculator },
    { id: 2, name: 'Hình học', progress: 60, lessons: 10, completed: 6, icon: Target },
    { id: 3, name: 'Thống kê', progress: 85, lessons: 8, completed: 7, icon: BarChart3 },
    { id: 4, name: 'Giải tích', progress: 45, lessons: 15, completed: 7, icon: Brain },
  ];

  const recentQuizzes = [
    { id: 1, title: 'Phương trình bậc 2', score: 95, maxScore: 100, date: '2 giờ trước' },
    { id: 2, title: 'Hình học không gian', score: 88, maxScore: 100, date: '1 ngày trước' },
    { id: 3, title: 'Logarit', score: 92, maxScore: 100, date: '2 ngày trước' },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      roleLabel="Học sinh"
      roleColor="from-blue-600 to-blue-700"
      
    >
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Xin chào, {user.name}!
        </h2>
        <p className="text-gray-600">Hãy tiếp tục hành trình học tập của bạn hôm nay</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">29</span>
          </div>
          <p className="text-sm text-gray-600">Bài học hoàn thành</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">8</span>
          </div>
          <p className="text-sm text-gray-600">Huy hiệu đạt được</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">15</span>
          </div>
          <p className="text-sm text-gray-600">Ngày học liên tục</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">91%</span>
          </div>
          <p className="text-sm text-gray-600">Điểm trung bình</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules Progress */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Module học tập</h3>
          <div className="space-y-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{module.name}</h4>
                        <p className="text-sm text-gray-500">{module.completed}/{module.lessons} bài học</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Bài kiểm tra gần đây</h3>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">{quiz.title}</p>
                    <p className="text-xs text-gray-500">{quiz.date}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">{quiz.score}</span>
                  <span className="text-sm text-gray-500">/ {quiz.maxScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
