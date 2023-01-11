from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import requests

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.wycyfhs.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/quizList', methods=['GET'])
def quiz_list():

    quiz_list = list(db.quiz.find({}, {'_id': False}))
    return jsonify({'quizList': quiz_list})


@app.route('/quizPresent')
def go_present():
    return render_template('present.html')

@app.route('/presentForm', methods=['POST'])
def quiz_solve():
    img = request.form['quiz_img']
    ans = request.form['quiz_ans']

    # img 저장 구현해야 함
    

    all_quiz = list(db.quiz.find({}, {'_id': False}))

    key = 0

    if len(all_quiz) != 0:
        key = all_quiz[len(all_quiz) - 1]['key'] + 1

    doc = {
        "quiz_key": key,
        "quiz_ans": ans,
        "img": img,
        "count": 0,
        "ans_count": 0,
        "like": 0
    }

    db.quiz.insert_one(doc)


@app.route('/quizSolve')
def go_quiz():
    return render_template('quiz.html')

@app.route('/getQuiz', methods=['GET'])
def get_quiz():

    quiz_key = request.url.split('=')[1]
    quiz = db.quiz.find_one({'quiz_key': int(quiz_key)},{'_id':False})

    return jsonify({'quiz': quiz})


@app.route('/sad')
def go_sad():
    return render_template('wrong.html')

@app.route('/happy')
def go_happy():
    return render_template('correct.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)




