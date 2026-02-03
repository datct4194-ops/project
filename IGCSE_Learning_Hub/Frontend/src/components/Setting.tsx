import { useState } from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('Nguyễn Văn A');

  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-xl font-bold">⚙ Settings</h2>

      <div>
        <label className="block text-sm font-medium">Tên hiển thị</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        Lưu thay đổi
      </button>
    </div>
  );
}
