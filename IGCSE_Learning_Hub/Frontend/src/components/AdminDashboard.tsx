import { Users, DollarSign, Shield, Activity, TrendingUp, UserPlus, CreditCard, AlertTriangle } from 'lucide-react';
import { User } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { useState } from 'react';
import { DashboardTab } from './DashboardLayout';


interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const userStats = [
    { role: 'Học sinh', count: 248, change: '+12', trend: 'up' },
    { role: 'Giáo viên', count: 18, change: '+2', trend: 'up' },
    { role: 'Phụ huynh', count: 195, change: '+8', trend: 'up' },
    { role: 'Quản lý', count: 5, change: '0', trend: 'same' },
  ];
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const recentTransactions = [
    { id: 1, user: 'Nguyễn Văn A', type: 'Thanh toán khóa học', amount: 2500000, status: 'Hoàn thành', date: '20/01/2026' },
    { id: 2, user: 'Trần Thị B', type: 'Gia hạn tháng', amount: 1200000, status: 'Hoàn thành', date: '19/01/2026' },
    { id: 3, user: 'Lê Văn C', type: 'Đăng ký mới', amount: 3000000, status: 'Đang xử lý', date: '19/01/2026' },
  ];

  const recentUsers = [
    { id: 1, name: 'Phạm Thị D', email: 'phamd@example.com', role: 'Học sinh', date: '1 giờ trước' },
    { id: 2, name: 'Hoàng Văn E', email: 'hoange@example.com', role: 'Phụ huynh', date: '3 giờ trước' },
    { id: 3, name: 'Võ Thị F', email: 'vof@example.com', role: 'Học sinh', date: '5 giờ trước' },
  ];

  const systemAlerts = [
    { id: 1, message: 'Cần cập nhật hệ thống thanh toán', severity: 'high', time: '2 giờ trước' },
    { id: 2, message: '3 tài khoản chưa xác thực email', severity: 'medium', time: '1 ngày trước' },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      roleLabel="Quản trị viên"
      roleColor="from-red-600 to-red-700"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quản trị viên {user.name} 🛡️
        </h2>
        <p className="text-gray-600">Quản lý người dùng và tài chính hệ thống</p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">466</span>
          </div>
          <p className="text-sm text-gray-600">Tổng người dùng</p>
          <p className="text-xs text-green-600 mt-1">+22 tháng này</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">₫85M</span>
          </div>
          <p className="text-sm text-gray-600">Doanh thu tháng này</p>
          <p className="text-xs text-green-600 mt-1">+15% so với tháng trước</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">94%</span>
          </div>
          <p className="text-sm text-gray-600">Tỷ lệ hoạt động</p>
          <p className="text-xs text-green-600 mt-1">+2% so với tuần trước</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <p className="text-sm text-gray-600">Cảnh báo hệ thống</p>
          <p className="text-xs text-orange-600 mt-1">Cần xử lý</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* User Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Thống kê người dùng</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Thêm người dùng</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{stat.role}</span>
                    <TrendingUp className={`w-4 h-4 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.count}</span>
                    <span className={`text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Giao dịch gần đây</h3>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Xem tất cả
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 pb-3">Người dùng</th>
                    <th className="text-left text-xs font-medium text-gray-500 pb-3">Loại giao dịch</th>
                    <th className="text-right text-xs font-medium text-gray-500 pb-3">Số tiền</th>
                    <th className="text-center text-xs font-medium text-gray-500 pb-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="py-3">
                        <p className="text-sm font-medium text-gray-900">{transaction.user}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{transaction.type}</td>
                      <td className="py-3 text-right text-sm font-semibold text-gray-900">
                        ₫{transaction.amount.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          transaction.status === 'Hoàn thành' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Cảnh báo</h3>
            </div>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${
                  alert.severity === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Người dùng mới</h3>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-blue-600">{user.role}</span>
                    <span className="text-xs text-gray-400">{user.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
