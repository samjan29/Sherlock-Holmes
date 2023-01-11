from flask import Flask, render_template, request, jsonify

import os
#저장 경로 설정 구간-----
print("초기 경로 확인 :", os.getcwd())
storage_exist = os.getcwd()+"\datastorage"
print(storage_exist)
if (os.path.isdir(storage_exist) == False):
    print("없으닌까 만들어봄")
    try:
        os.mkdir('datastorage')
    except:
        print("만들려했으나 안되나봄")

else:
    print("있어서 안만듬")

# 저장 경로 설정 구간-----

app = Flask(__name__)

import json


@app.route('/')
def home():


    return render_template('canvas_prac.html')


@app.route('/upload', methods=['POST'])
def upload():
    data_url_receive = request.form['data_url_give']
    answer_receive = request.form['answer_give']
    subject_receive = request.form['subject_give']
    hard_receive = request.form['hard_give']

    # ----문제에 대한 정보를 저장하는 구간
    file_name = os.getcwd()+"\datastorage\plzsave.json"


    if (os.path.isfile(file_name) == False): ##아무것도 없을때 틀을 잡기위해 넣어보는 데이터입니다. 즉, 첫번째 데이터는 안쓸겁니다.

        json_start = {}
        json_start['row'] = [
            {
                "ans": "코끼리",
                "sub": "동물",
                "hard": "4",
                "url": "awdnajwklndkjawc;"
            }]

        with open(file_name, 'w') as outfile:
            json.dump(json_start, outfile)

    with open(file_name, 'r') as json_file:
        json_new = json.load(json_file)

    json_new['row'].append({
        "ans": answer_receive,
        "sub": subject_receive,
        "hard": hard_receive,
        "url": data_url_receive
    })



    with open(file_name, 'w') as outfile:
        json.dump(json_new, outfile, indent=4)

    return jsonify({'msg': '이미지 업로드 성공!','ans':answer_receive,'sub':subject_receive,'hard':hard_receive})



@app.route('/image', methods=['GET'])
def show():

    file_name = os.getcwd()+"\datastorage\plzsave.json"
    with open(file_name, 'r') as json_file:
        problems = json.load(json_file)

    print(type(problems))

    return jsonify({'problem': problems})





if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)



