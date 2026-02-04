import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Users,
  DollarSign,
  Shield,
  Layers,
  FileText,
  UserCircle
} from 'lucide-react';
import { useState } from 'react';
import { UserRole } from '../App';
import { DashboardTab } from './DashboardLayout';
import { Dispatch, SetStateAction } from 'react';
interface MenuItem {
  label: string;
  key: DashboardTab;
  icon: any;
}
interface SidebarProps {
  onLogout: () => void;
  role: UserRole; // Thêm prop này để nhận vai trò từ Layout
  activeTab: DashboardTab;
  setActiveTab: Dispatch<SetStateAction<DashboardTab>>;
}

export function Sidebar({ onLogout, role, activeTab, setActiveTab }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  // Định nghĩa menu riêng biệt cho từng vai trò
  const menuConfigs: Record<UserRole, MenuItem[]> = {
    admin: [
      { label: 'Tổng quan', key: 'overview', icon: LayoutDashboard },
      { label: 'Người dùng', key: 'users', icon: Users },
      { label: 'Tài chính', key: 'finance', icon: DollarSign },
      { label: 'Hệ thống', key: 'system', icon: Shield },
      { label: 'Cài đặt', key: 'settings', icon: Settings },
    ],
    teacher: [
      { label: 'Lớp học', key: 'overview', icon: LayoutDashboard },
      { label: 'Học sinh', key: 'students', icon: Users },
      { label: 'Tài liệu', key: 'resources', icon: FileText },
      { label: 'Bài tập', key: 'assignments', icon: ClipboardList },
      { label: 'Cài đặt', key: 'settings', icon: Settings },
    ],
    student: [
      { label: 'Dashboard', key: 'overview', icon: LayoutDashboard },
      { label: 'Bài học', key: 'lessons', icon: BookOpen },
      { label: 'Bài tập', key: 'quiz', icon: ClipboardList },
      { label: 'Thống kê', key: 'stats', icon: BarChart3 },
      { label: 'Cài đặt', key: 'settings', icon: Settings },
],
    parent: [
      { label: 'Tiến độ', key: 'overview', icon: LayoutDashboard },
      { label: 'Con em', key: 'children', icon: UserCircle },
      { label: 'Báo cáo', key: 'reports', icon: BarChart3 },
      { label: 'Liên hệ', key: 'contact', icon: Settings },
    ],
    manager: [
      { label: 'Quản lý học tập', key: 'overview', icon: LayoutDashboard },
      { label: 'Khóa học', key: 'courses', icon: Layers },
      { label: 'Nội dung', key: 'content', icon: BookOpen },
      { label: 'Thống kê', key: 'stats', icon: BarChart3 },
    ],
  };

  const currentMenu = menuConfigs[role] || menuConfigs.student;

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="h-16 flex items-center justify-end px-3 border-b">
        <button onClick={() => setExpanded(!expanded)} className="p-2 rounded hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {currentMenu.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;

        return (
        <button
        key={item.key}
        onClick={() => setActiveTab(item.key)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
          ${isActive
            ? 'bg-blue-100 text-blue-600'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}
          `}
        >
            <Icon className="w-5 h-5" />
            {expanded && <span>{item.label}</span>}
          </button>
        );
      })}

      </nav>
    </aside>
  );
}