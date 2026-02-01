import mysql.connector

try:
    # Cấu hình kết nối tới XAMPP
    connection = mysql.connector.connect(
        host='localhost',       # XAMPP chạy trên máy cục bộ
        user='root',            # User mặc định của XAMPP
        password='',            # Mật khẩu mặc định là trống
        database='ten_db_cua_ban' # Thay bằng tên database bạn đã tạo
    )

    if connection.is_connected():
        print("Kết nối thành công tới MySQL trong XAMPP!")
        
        # Thử lấy dữ liệu từ bảng User
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User")
        rows = cursor.fetchall()
        
        for row in rows:
            print(row)

except mysql.connector.Error as err:
    print(f"Lỗi rồi bạn ơi: {err}")

finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("Đã đóng kết nối.")