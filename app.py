from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import base64, io

from PIL import Image

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    data_url_receive = request.form['data_url_give']

    # data = data_url_receive.split(',')
    # image_data = base64.b64decode(data[1])
    # image = Image.open(io.BytesIO(image_data)

    # file = open('image.txt', 'w', encoding='utf-8')
    # file.write(data_url_receive + '.')
    # file.close()

    image_data = base64.b64decode(data_url_receive.split(',')[1])
    byte_io = io.BytesIO(image_data)
    img = Image.open(byte_io)
    img.save('static/image/one.png', 'png')

    return jsonify({'msg': '이미지 업로드 성공!'})


# @app.route('/show', methods=['GET'])
# def show():
#     file = open('image.txt', 'r', encoding='utf-8')
#     images = file.read().split('.')
#     file.close()
#
#     return jsonify({'image': images[0]})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)