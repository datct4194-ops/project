import { BarChart3, TrendingUp } from 'lucide-react';

export default function Stats() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> Thống kê học tập</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <BarChart3 className="text-blue-600 mb-2" />
          <p className="text-gray-500">Điểm trung bình</p>
          <p className="text-3xl font-bold">91%</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <TrendingUp className="text-green-600 mb-2" />
          <p className="text-gray-500">Tiến độ hoàn thành</p>
          <p className="text-3xl font-bold">72%</p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          
          <p className="text-gray-500 mt-2">Ngày học liên tục</p>
          <p className="text-3xl font-bold">15</p>
        </div>
      </div>
    </div>
  );
}
