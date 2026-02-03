import {
  Trophy, Calendar, BarChart3, Calculator, Brain,
  Target, BookOpen, CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import Lessons from './Lessons';
import Quiz from './Quiz';
import Stats from './Stats';
import Settings from './Setting';
import { User } from '../App';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export function StudentDashboard({
  user,
  activeTab = 'overview', // fallback an toàn
  setActiveTab,
}: StudentDashboardProps) {

  /* ================= DASHBOARD DATA ================= */
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

  /* ================= RENDER THEO SIDEBAR ================= */
  if (activeTab === 'lessons') return <Lessons />;
  if (activeTab === 'quiz') return <Quiz />;
  if (activeTab === 'stats') return <Stats />;
  if (activeTab === 'settings') return <Settings />;

  /* ================= DASHBOARD (MẶC ĐỊNH) ================= */
  return (
    <>
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Xin chào, {user.name}!
        </h2>
        <p className="text-gray-600">
          Hãy tiếp tục hành trình học tập của bạn hôm nay
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard icon={BookOpen} value="29" label="Bài học hoàn thành" color="bg-blue-100" iconColor="text-blue-600" />
        <StatsCard icon={Trophy} value="8" label="Huy hiệu đạt được" color="bg-green-100" iconColor="text-green-600" />
        <StatsCard icon={Calendar} value="15" label="Ngày học liên tục" color="bg-purple-100" iconColor="text-purple-600" />
        <StatsCard icon={BarChart3} value="91%" label="Điểm trung bình" color="bg-orange-100" iconColor="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Module học tập</h3>
          <div className="space-y-6">
            {modules.map((module) => (
              <ModuleItem key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Bài kiểm tra gần đây</h3>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <QuizItem key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= SUB COMPONENTS ================= */
function StatsCard({ icon: Icon, value, label, color, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${color} rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function ModuleItem({ module }: any) {
  const Icon = module.icon;
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{module.name}</h4>
            <p className="text-sm text-gray-500">
              {module.completed}/{module.lessons} bài học
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-blue-600">
          {module.progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${module.progress}%` }}
        />
      </div>
    </div>
  );
}

function QuizItem({ quiz }: any) {
  return (
    <div className="pb-4 border-b border-gray-100 last:border-0">
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
  );
}
