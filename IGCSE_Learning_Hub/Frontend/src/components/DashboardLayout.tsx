import { ReactNode } from 'react';
import { BookOpen, LogOut } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { User } from '../App';
import { Dispatch, SetStateAction } from 'react';


interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  children: ReactNode;
  roleLabel: string;
  roleColor: string;
  activeTab: DashboardTab;
  setActiveTab: Dispatch<SetStateAction<DashboardTab>>;

}
export type DashboardTab =
  | 'overview'
  | 'users'
  | 'finance'
  | 'system'
  | 'dashboard'
  | 'students'
  | 'children'
  | 'documents'
  | 'assignments'
  | 'reports'
  | 'contacts'
  | 'contact'
  | 'content'
  | 'courses'
  | 'lessons'
  | 'quiz'
  | 'stats'
  | 'resources'
  | 'documents'
  | 'assignments'
  | 'feedback'
  | 'settings';

export function DashboardLayout({
  user,
  onLogout,
  children,
  roleLabel,
  roleColor,
  activeTab,
  setActiveTab,
}: DashboardLayoutProps) {

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar onLogout={onLogout} role={user.role} activeTab={activeTab} setActiveTab={setActiveTab}  />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${roleColor} rounded-xl`}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Hệ thống học Toán IGCSE
              </h1>
              <p className="text-sm text-gray-500">{roleLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
