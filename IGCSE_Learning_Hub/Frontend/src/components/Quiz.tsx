import { ClipboardList } from 'lucide-react';

const quizzes = [
  { id: 1, title: 'Phương trình bậc 2', time: '15 phút', score: 95 },
  { id: 2, title: 'Hình học không gian', time: '20 phút', score: 88 },
  { id: 3, title: 'Logarit', time: '10 phút', score: null },
];

export default function Quiz() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> Bài tập & Kiểm tra</h2>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{quiz.title}</p>
              <p className="text-sm text-gray-500">⏱ {quiz.time}</p>
            </div>

            {quiz.score !== null ? (
              <span className="font-bold text-blue-600">
                {quiz.score}/100
              </span>
            ) : (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Làm bài
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
