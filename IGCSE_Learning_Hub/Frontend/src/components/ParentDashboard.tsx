import { User as UserIcon, TrendingUp, Calendar, BookOpen, Award, Clock, CheckCircle } from 'lucide-react';
import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { useState} from 'react';

interface ParentDashboardProps {
  user: User;
  onLogout: () => void;
}
export type DashboardTab =
  | 'dashboard'
  | 'students'
  | 'resources'
  | 'feedback'
  | 'settings';
export function ParentDashboard({ user, onLogout }: ParentDashboardProps) {
  const children = [
    { 
      id: 1, 
      name: 'Nguyễn Văn An', 
      grade: 'IGCSE Year 10',
      avatar: 'NVA',
      isActive: true 
    },
    { 
      id: 2, 
      name: 'Nguyễn Thị Bảo', 
      grade: 'IGCSE Year 9',
      avatar: 'NTB',
      isActive: false 
    },
  ];

  const [selectedChild, setSelectedChild] = React.useState(children[0]);

  const weeklyProgress = [
    { day: 'T2', hours: 2.5 },
    { day: 'T3', hours: 3.0 },
    { day: 'T4', hours: 2.0 },
    { day: 'T5', hours: 3.5 },
    { day: 'T6', hours: 2.5 },
    { day: 'T7', hours: 1.5 },
    { day: 'CN', hours: 2.0 },
  ];

  const recentActivities = [
    { id: 1, activity: 'Hoàn thành bài kiểm tra Đại số', score: '95/100', time: '2 giờ trước', status: 'excellent' },
    { id: 2, activity: 'Học xong Module Hình học', score: '8/10 bài', time: '1 ngày trước', status: 'good' },
    { id: 3, activity: 'Tham gia lớp học trực tuyến', score: '45 phút', time: '2 ngày trước', status: 'normal' },
  ];

  const subjects = [
    { name: 'Đại số', score: 92, trend: 'up' },
    { name: 'Hình học', score: 88, trend: 'up' },
    { name: 'Thống kê', score: 85, trend: 'same' },
    { name: 'Giải tích', score: 78, trend: 'down' },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      roleLabel="Phụ huynh"
      roleColor="from-green-600 to-green-700"
      activeTab={'dashboard'}
      setActiveTab={() => {}}
      
    >
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Xin chào, {user.name}! 
        </h2>
        <p className="text-gray-600">Theo dõi tiến độ học tập của con em bạn</p>
      </div>

      {/* Child Selection */}
      <div className="mb-6 flex gap-4">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              selectedChild.id === child.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedChild.id === child.id ? 'bg-green-500' : 'bg-gray-200'
            }`}>
              <span className={`font-semibold ${
                selectedChild.id === child.id ? 'text-white' : 'text-gray-600'
              }`}>
                {child.avatar}
              </span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">{child.name}</p>
              <p className="text-sm text-gray-500">{child.grade}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">86%</span>
          </div>
          <p className="text-sm text-gray-600">Điểm trung bình</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">24</span>
          </div>
          <p className="text-sm text-gray-600">Bài học hoàn thành</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">17.5</span>
          </div>
          <p className="text-sm text-gray-600">Giờ học tuần này</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">5</span>
          </div>
          <p className="text-sm text-gray-600">Huy hiệu mới</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Progress Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Thời gian học tập trong tuần</h3>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                    <div 
                      className="bg-green-500 rounded-t-lg absolute bottom-0 w-full transition-all"
                      style={{ height: `${(day.hours / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{day.day}</span>
                  <span className="text-xs font-semibold text-gray-900">{day.hours}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Kết quả theo môn học</h3>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{subject.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">{subject.score}%</span>
                        {subject.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {subject.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${subject.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((item) => (
              <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className={`w-5 h-5 mt-0.5 ${
                    item.status === 'excellent' ? 'text-green-500' :
                    item.status === 'good' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                    <p className="text-sm text-green-600 mt-1">{item.score}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import React from 'react';
