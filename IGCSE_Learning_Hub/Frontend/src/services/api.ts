
const API_URL = "http://localhost:8000";


export async function getStudentDashboard(id: number) {
  const res = await fetch(`${API_URL}/dashboard/student/${id}`);
  return res.json();
}
