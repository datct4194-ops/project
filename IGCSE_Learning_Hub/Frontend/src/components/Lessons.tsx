import { BookOpen, PlayCircle, CheckCircle } from 'lucide-react';

const lessons = [
  { id: 1, title: 'Phương trình bậc nhất', status: 'completed' },
  { id: 2, title: 'Phương trình bậc hai', status: 'completed' },
  { id: 3, title: 'Hệ phương trình', status: 'learning' },
  { id: 4, title: 'Bất phương trình', status: 'locked' },
];

export default function Lessons() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> Bài học</h2>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" />
              <span className="font-medium">{lesson.title}</span>
            </div>

            {lesson.status === 'completed' && (
              <CheckCircle className="text-green-500" />
            )}
            {lesson.status === 'learning' && (
              <PlayCircle className="text-blue-500" />
            )}
            {lesson.status === 'locked' && (
              <span className="text-sm text-gray-400"> Chưa mở</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
