interface Lessons {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

export default function LessonPage() {
  const Lessons: Lessons[] = [
    { id: 1, title: 'Algebra Basics', duration: '30 phút', completed: true },
    { id: 2, title: 'Linear Equations', duration: '45 phút', completed: false },
    { id: 3, title: 'Quadratic Functions', duration: '40 phút', completed: false },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">📘 Lessons</h2>

      {Lessons.map(lesson => (
        <div
          key={lesson.id}
          className="p-4 bg-white rounded-lg border flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{lesson.title}</h3>
            <p className="text-sm text-gray-500">{lesson.duration}</p>
          </div>

          {lesson.completed ? (
            <span className="text-green-600 font-medium">✔ Hoàn thành</span>
          ) : (
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              Học ngay
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
