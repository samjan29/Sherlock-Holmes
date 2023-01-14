from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.wycyfhs.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

import base64, io, random, string

from PIL import Image


@app.route('/')
def index():
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
    img_data = request.form['quiz_img']
    ans = request.form['quiz_ans']

    all_quiz = list(db.quiz.find({}, {'_id': False}))   # 한글

    key = 1

    if len(all_quiz) != 0:
        key = all_quiz[len(all_quiz) - 1]['quiz_key'] + 1

    # img 저장 구현해야 함
    image_data = base64.b64decode(img_data.split(',')[1])
    byte_io = io.BytesIO(image_data)
    img = Image.open(byte_io)

    letters_set = string.ascii_letters
    random_list = random.sample(letters_set, 10)
    random_name = ''.join(random_list)
    img_name = random_name + str(key)

    img.save('static/image/' + img_name + '.png', 'png')

    doc = {
        "quiz_key": key,
        "quiz_ans": ans,
        "img": img_name,
        "count": 0,
        "ans_count": 0,
        "like": 0
    }

    db.quiz.insert_one(doc)

    return jsonify({'msg': '출제 완료'})


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

@app.route('/showAnswer', methods=['GET'])
def get_ans():

    quiz_key = request.url.split('?')[1]
    quiz = db.quiz.find_one({'quiz_key': int(quiz_key)},{'_id':False})

    return jsonify({'ans': quiz['quiz_ans']})

@app.route('/happy')
def go_happy():
    return render_template('correct.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
