export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> Cài đặt</h2>

      <div className="bg-white p-6 rounded-xl border max-w-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tên hiển thị</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="email@example.com"
          />
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
