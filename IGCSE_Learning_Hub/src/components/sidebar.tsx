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

interface SidebarProps {
  onLogout: () => void;
  role: UserRole; // Thêm prop này để nhận vai trò từ Layout
}

export function Sidebar({ onLogout, role }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  // Định nghĩa menu riêng biệt cho từng vai trò
  const menuConfigs: Record<UserRole, { label: string; icon: any }[]> = {
    admin: [
      { label: 'Tổng quan', icon: LayoutDashboard },
      { label: 'Người dùng', icon: Users },
      { label: 'Tài chính', icon: DollarSign },
      { label: 'Hệ thống', icon: Shield },
      { label: 'Cài đặt', icon: Settings },
    ],
    teacher: [
      { label: 'Lớp học', icon: LayoutDashboard },
      { label: 'Học sinh', icon: Users },
      { label: 'Tài liệu', icon: FileText },
      { label: 'Bài tập', icon: ClipboardList },
      { label: 'Cài đặt', icon: Settings },
    ],
    student: [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Bài học', icon: BookOpen },
      { label: 'Bài tập', icon: ClipboardList },
      { label: 'Thống kê', icon: BarChart3 },
      { label: 'Cài đặt', icon: Settings },
    ],
    parent: [
      { label: 'Tiến độ', icon: LayoutDashboard },
      { label: 'Con em', icon: UserCircle },
      { label: 'Báo cáo', icon: BarChart3 },
      { label: 'Liên hệ', icon: Settings },
    ],
    manager: [
      { label: 'Quản lý học tập', icon: LayoutDashboard },
      { label: 'Khóa học', icon: Layers },
      { label: 'Nội dung', icon: BookOpen },
      { label: 'Thống kê', icon: BarChart3 },
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
        {currentMenu.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {expanded && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}