import { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardTab } from './components/DashboardLayout';


export type UserRole = 'student' | 'teacher' | 'parent' | 'admin' | 'manager';
export interface User {
  name: string;
  email: string;
  role: UserRole;
}

type ViewMode = 'login' | 'register';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [user, setUser] = useState<User | null>(null);

  // HÀM ĐĂNG KÝ GỌI API
  const handleRegister = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Đăng ký thành công! Hãy đăng nhập.");
        setViewMode('login');
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      alert("Không thể kết nối tới Server Python!");
    }
  };

  // HÀM ĐĂNG NHẬP GỌI API
  const handleLogin = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      return { success: false, message: "Server Backend chưa chạy!" };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const renderDashboard = () => {
    if (!user) return null;
    switch (user.role) {
      case 'student':
  return (
    <DashboardLayout
      user={user}
      onLogout={handleLogout}
      roleLabel="Học sinh"
      roleColor="from-blue-500 to-purple-500"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <StudentDashboard
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={(tab: string) => setActiveTab(tab as DashboardTab)}
      />
    </DashboardLayout>
  );

      case 'teacher': return <TeacherDashboard user={user} onLogout={handleLogout} />;
      case 'parent': return <ParentDashboard user={user} onLogout={handleLogout} />;
      case 'admin': return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'manager': return <ManagerDashboard user={user} onLogout={handleLogout} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {!isLoggedIn ? (
        viewMode === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setViewMode('register')} registeredUsersCount={0} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setViewMode('login')} existingEmails={[]} />
        )
      ) : (
        renderDashboard()
      )}
    </div>
  );
}