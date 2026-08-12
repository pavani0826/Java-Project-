import os
import mysql.connector


def save_message(message):
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

    cursor = db.cursor()

    query = "INSERT INTO messages (message) VALUES (%s)"
    cursor.execute(query, (message,))

    db.commit()

    cursor.close()
    db.close()