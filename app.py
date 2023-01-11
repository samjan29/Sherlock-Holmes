from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/present')
def present():
    return render_template('present.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/correct')
def correct():
    return render_template('correct.html')

@app.route('/wrong')
def wrong():
    return render_template('wrong.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=3000, debug=True)