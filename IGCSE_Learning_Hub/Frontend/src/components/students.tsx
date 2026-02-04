export function Students() {
  const students = [
    { id: 1, name: 'Nguyễn Văn A', progress: 85 },
    { id: 2, name: 'Trần Thị B', progress: 92 },
    { id: 3, name: 'Lê Văn C', progress: 45 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách học sinh</h2>

      <div className="space-y-3">
        {students.map((s) => (
          <div
            key={s.id}
            className="p-4 bg-white border rounded-lg flex justify-between"
          >
            <span>{s.name}</span>
            <span className="font-semibold">{s.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
