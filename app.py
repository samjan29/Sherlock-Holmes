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

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
   app.run('0.0.0.0', port=3000, debug=True)