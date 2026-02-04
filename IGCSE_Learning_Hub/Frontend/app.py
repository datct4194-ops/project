from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='igsce'
    )

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        query = "INSERT INTO User (Name, Email, Password, Role) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['name'], data['email'], data['password'], data['role']))
        conn.commit()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    selected_role = data.get('role')
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Tìm user chỉ bằng email và password
    query = "SELECT * FROM User WHERE Email = %s AND Password = %s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user:
        return jsonify({
            "success": False, 
            "message": "Email hoặc mật khẩu không chính xác!"
        }), 401

    user_role = user['Role'].lower()
    
    # Logic đặc biệt cho phụ huynh
    if selected_role == 'parent':
        if user_role in ['student', 'parent']:
            return jsonify({
                "success": True,
                "user": {
                    "name": user['Name'],
                    "email": user['Email'],
                    "role": selected_role,
                    "originalRole": user_role
                }
            })
        else:
            return jsonify({
                "success": False,
                "message": "Tài khoản này không thể đăng nhập với vai trò Phụ huynh!"
            }), 403
    
    # Các vai trò khác phải khớp
    if user_role != selected_role:
        return jsonify({
            "success": False,
            "message": "Vai trò không khớp! Vui lòng chọn đúng vai trò của bạn."
        }), 403

    return jsonify({
        "success": True,
        "user": {
            "name": user['Name'],
            "email": user['Email'],
            "role": user_role
        }
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)