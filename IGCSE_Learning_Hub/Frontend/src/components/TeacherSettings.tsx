import { User } from '../App';

export function TeacherSettings({ user }: { user: User }) {
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold mb-4"> Cài đặt giáo viên</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Tên</label>
          <input
            defaultValue={user.name}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            defaultValue={user.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
