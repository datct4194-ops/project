export default function StatsPage() {
  const stats = {
    completedLessons: 12,
    totalLessons: 20,
    quizzesPassed: 5,
    averageScore: 82,
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard title="Lessons hoàn thành" value={`${stats.completedLessons}/${stats.totalLessons}`} />
      <StatCard title="Quiz đã qua" value={stats.quizzesPassed} />
      <StatCard title="Điểm trung bình" value={`${stats.averageScore}%`} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
