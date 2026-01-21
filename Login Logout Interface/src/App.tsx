import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin' | 'manager';

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisteredUser extends User {
  password: string;
  registeredDate: string;
}

type ViewMode = 'login' | 'register';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);

  // Load registered users from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('registeredUsers');
    if (stored) {
      setRegisteredUsers(JSON.parse(stored));
    }
  }, []);

  // Save registered users to localStorage whenever it changes
  useEffect(() => {
    if (registeredUsers.length > 0) {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
  }, [registeredUsers]);

  const handleRegister = (name: string, email: string, password: string, role: UserRole) => {
    const newUser: RegisteredUser = {
      name,
      email,
      password,
      role,
      registeredDate: new Date().toISOString(),
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    setViewMode('login');
  };

  const handleLogin = (email: string, password: string, role: UserRole): { success: boolean; message?: string } => {
    // Special case for parents: they can login with student credentials
    if (role === 'parent') {
      const studentAccount = registeredUsers.find(
        (u) => u.email === email && u.password === password && u.role === 'student'
      );

      if (studentAccount) {
        setUser({
          name: `Phụ huynh của ${studentAccount.name}`,
          email: studentAccount.email,
          role: 'parent',
        });
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Không tìm thấy tài khoản học sinh với email và mật khẩu này. Phụ huynh sử dụng thông tin đăng nhập của học sinh để truy cập.' 
        };
      }
    }

    // For other roles, find user with matching credentials
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!foundUser) {
      return { 
        success: false, 
        message: 'Email, mật khẩu hoặc vai trò không đúng. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới.' 
      };
    }

    setUser({
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    });
    setIsLoggedIn(true);
    return { success: true };
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} onLogout={handleLogout} />;
      case 'teacher':
        return <TeacherDashboard user={user} onLogout={handleLogout} />;
      case 'parent':
        return <ParentDashboard user={user} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'manager':
        return <ManagerDashboard user={user} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {!isLoggedIn ? (
        viewMode === 'login' ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setViewMode('register')}
            registeredUsersCount={registeredUsers.length}
          />
        ) : (
          <Register 
            onRegister={handleRegister}
            onSwitchToLogin={() => setViewMode('login')}
            existingEmails={registeredUsers.map(u => u.email)}
          />
        )
      ) : (
        renderDashboard()
      )}
    </div>
  );
}