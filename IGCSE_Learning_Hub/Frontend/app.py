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
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM User WHERE Email = %s AND Password = %s AND Role = %s"
    cursor.execute(query, (data['email'], data['password'], data['role']))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({
            "success": True, 
            "user": {"name": user['Name'], "email": user['Email'], "role": user['Role'].lower()}
        })
    return jsonify({"success": False, "message": "Thông tin đăng nhập không chính xác!"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)