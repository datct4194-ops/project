import { useState } from 'react';
import { BookOpen, Lock, Mail, UserCircle, GraduationCap, Users, Shield, Briefcase, User, AlertCircle } from 'lucide-react';
import { UserRole } from '../App';

interface LoginProps {
  onLogin: (
    email: string,
    password: string,
    role: UserRole
  ) => Promise<{
    success: boolean;
    message?: string;
  }>;
  onSwitchToRegister: () => void;
  registeredUsersCount: number;
}


const roles = [
  { 
    value: 'student' as UserRole, 
    label: 'Sinh viên', 
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    description: 'Truy cập bài học, làm bài kiểm tra'
  },
  { 
    value: 'teacher' as UserRole, 
    label: 'Giáo viên', 
    icon: User,
    color: 'from-purple-500 to-purple-600',
    description: 'Quản lý học sinh, tải tài liệu'
  },
  { 
    value: 'parent' as UserRole, 
    label: 'Phụ huynh', 
    icon: Users,
    color: 'from-green-500 to-green-600',
    description: 'Theo dõi tiến độ học tập'
  },
  { 
    value: 'admin' as UserRole, 
    label: 'Quản trị viên', 
    icon: Shield,
    color: 'from-red-500 to-red-600',
    description: 'Quản lý hệ thống, tài chính'
  },
  { 
    value: 'manager' as UserRole, 
    label: 'Quản lý khóa học', 
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    description: 'Quản lý nội dung khóa học'
  },
];

export function Login({ onLogin, onSwitchToRegister, registeredUsersCount }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email && password && selectedRole) {
      const result = await onLogin(email, password, selectedRole);

    if (!result.success) {
      setError(result.message || 'Đăng nhập thất bại');
      }
    }
    };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hệ thống quản lý học tập Toán IGCSE
          </h1>
          <p className="text-gray-600">
            Nền tảng học tập cá nhân hóa dành cho mọi đối tượng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Chọn vai trò của bạn
            </h2>
            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.value}
                    onClick={() => setSelectedRole(role.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedRole === role.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-br ${role.color} rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{role.label}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                      {selectedRole === role.value && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Đăng nhập
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Selected Role Display */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Đăng nhập với vai trò:{' '}
                    <span className="text-blue-600">
                      {roles.find(r => r.value === selectedRole)?.label}
                    </span>
                  </span>
                </div>
                {selectedRole === 'parent' && (
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Phụ huynh sử dụng email và mật khẩu của học sinh để đăng nhập
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder={`${selectedRole}@igcse.edu`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Đăng nhập
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <button 
                  onClick={onSwitchToRegister}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            ℹ️ Vui lòng đăng ký tài khoản trước khi đăng nhập. 
            <span className="font-semibold"> Phụ huynh không cần đăng ký</span> - sử dụng thông tin đăng nhập của học sinh.
          </p>
        </div>
      </div>
    </div>
  );
}