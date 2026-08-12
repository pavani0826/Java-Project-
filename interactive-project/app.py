from flask import Flask, request, render_template
from database import save_message

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        message = request.form["message"]
        save_message(message)
        return "Message saved successfully!"

    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
