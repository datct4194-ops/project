import { useState } from 'react';
import { BookOpen, Lock, Mail, UserCircle, GraduationCap, Users, Shield, Briefcase, User as UserIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { UserRole } from '../App';

interface RegisterProps {
  onRegister: (name: string, email: string, password: string, role: UserRole) => void;
  onSwitchToLogin: () => void;
  existingEmails: string[];
}

const roles = [
  { 
    value: 'student' as UserRole, 
    label: 'Học sinh', 
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-600',
    description: 'Truy cập bài học, làm bài kiểm tra'
  },
  { 
    value: 'teacher' as UserRole, 
    label: 'Giáo viên', 
    icon: UserIcon,
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

export function Register({ onRegister, onSwitchToLogin, existingEmails }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Confirmation codes for special roles
  const confirmationCodes: Record<string, string> = {
    teacher: '123',
    admin: '234',
    manager: '345',
  };

  const requiresConfirmationCode = (role: UserRole) => {
    return role === 'teacher' || role === 'admin' || role === 'manager';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!name.trim()) {
      setError('Vui lòng nhập họ tên');
      return;
    }

    if (name.trim().length < 3) {
      setError('Họ tên phải có ít nhất 3 ký tự');
      return;
    }

    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }

    if (existingEmails.includes(email.toLowerCase())) {
      setError('Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Check confirmation code for special roles
    if (requiresConfirmationCode(selectedRole)) {
      if (!confirmationCode.trim()) {
        setError('Vui lòng nhập mã xác nhận cho vai trò này');
        return;
      }

      if (confirmationCode !== confirmationCodes[selectedRole]) {
        const roleNames: Record<string, string> = {
          teacher: 'giáo viên',
          admin: 'quản trị viên',
          manager: 'quản lý khóa học',
        };
        setError(`Mã xác nhận ${roleNames[selectedRole]} không đúng. Vui lòng liên hệ ban quản trị để được cấp mã.`);
        return;
      }
    }

    // Register user
    onRegister(name.trim(), email.toLowerCase().trim(), password, selectedRole);
    setSuccess(true);

    // Redirect to login after 2 seconds
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Đăng ký thành công!
            </h2>
            <p className="text-gray-600 mb-4">
              Tài khoản của bạn đã được tạo. Đang chuyển đến trang đăng nhập...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đăng ký tài khoản mới
          </h1>
          <p className="text-gray-600">
            Tạo tài khoản để bắt đầu hành trình học tập
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Chọn vai trò của bạn
            </h2>
            <p className="text-xs text-gray-600 mb-3">
              <span className="font-semibold text-green-600">Lưu ý:</span> Phụ huynh không cần đăng ký tài khoản riêng. Sử dụng thông tin học sinh để đăng nhập.
            </p>
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
                    } ${role.value === 'parent' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={role.value === 'parent'}
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

          {/* Register Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Thông tin đăng ký
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    Đăng ký với vai trò:{' '}
                    <span className="text-blue-600">
                      {roles.find(r => r.value === selectedRole)?.label}
                    </span>
                  </span>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
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
                  Mật khẩu <span className="text-red-500">*</span>
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
                    placeholder="Ít nhất 6 ký tự"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Nhập lại mật khẩu"
                    required
                  />
                </div>
              </div>

              {/* Confirmation Code for Special Roles */}
              {requiresConfirmationCode(selectedRole) && (
                <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                  <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Mã xác nhận vai trò <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5 text-yellow-600" />
                    </div>
                    <input
                      id="confirmationCode"
                      type="password"
                      value={confirmationCode}
                      onChange={(e) => {
                        setConfirmationCode(e.target.value);
                        setError('');
                      }}
                      className="block w-full pl-10 pr-3 py-2.5 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                      placeholder="Nhập mã xác nhận"
                      required
                    />
                  </div>
                  <p className="text-xs text-yellow-700 mt-2">
                    ⚠️ Vai trò {roles.find(r => r.value === selectedRole)?.label} yêu cầu mã xác nhận đặc biệt. Vui lòng liên hệ ban quản trị nếu chưa có mã.
                  </p>
                </div>
              )}

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Điều khoản sử dụng
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    Chính sách bảo mật
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Đăng ký
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <button 
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 text-center">
            ✅ Sau khi đăng ký thành công, bạn có thể đăng nhập vào hệ thống với tài khoản vừa tạo.
            <br />
            <span className="font-semibold">Phụ huynh:</span> Sử dụng thông tin đăng nhập của học sinh, không cần đăng ký riêng.
            <br />
            <span className="font-semibold">Giáo viên, Quản trị viên, Quản lý:</span> Cần mã xác nhận khi đăng ký.
          </p>
        </div>
      </div>
    </div>
  );
}