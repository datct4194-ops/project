import { useState } from 'react';

export default function QuizPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const question = {
    text: '2x + 3 = 7. Giá trị của x là?',
    options: ['1', '2', '3', '4'],
    correct: 1,
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">📝 Quiz</h2>

      <p className="font-medium">{question.text}</p>

      {question.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => setSelected(idx)}
          className={`block w-full text-left p-3 border rounded
            ${selected === idx ? 'bg-blue-100 border-blue-500' : ''}
          `}
        >
          {opt}
        </button>
      ))}

      {selected !== null && (
        <p className="font-semibold">
          {selected === question.correct ? '✅ Đúng!' : '❌ Sai rồi'}
        </p>
      )}
    </div>
  );
}
