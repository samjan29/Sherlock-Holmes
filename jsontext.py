from flask import Flask, render_template, request, jsonify

import os


print("초기설정경로", os.getcwd())
new_dir = os.getcwd()+'\datastorage'
# os.chdir("C://Users//lhbs0//Desktop//항해99//0주차 미니프로젝트//datastorage")
# os.chdir("..//datastorage")
print("새로 만든 경로",new_dir)
os.chdir(new_dir)
print("새로 만든 경로로 바꿔줬음", os.getcwd())
print(os.path.dirname(os.path.realpath(__file__)) )

app = Flask(__name__)

import json

count_path = os.getcwd()+"\pro_count.txt"
print("count_path :", count_path)
if (os.path.isfile(count_path) == False):
    file = open('pro_count.txt', 'w', encoding='utf-8')
    print("존재안했구먼")
    file.close()


file = open('pro_count.txt', 'r', encoding='utf-8')
data = file.read()
file.close()
if data == "" :
    count = 0
else :
    count = int(data)

count += 1

print(count)

file = open('pro_count.txt', 'w', encoding='utf-8')

file.write(str(count))
file.close()




#
# json_data = {}
# json_data['row'] = [
#     {
#         "ans":"코끼리",
#         "sub":"동물",
#         "hard":"4",
#         "url":"awdnajwklndkjawc;"
#     }]
#
# json_data['row'].append([{
#         "ans":"시조새",
#         "sub":"공룡",
#         "hard":"5",
#         "url":"qwerqwerqwerqwer;"
# }])
#
#
# print(json_data)
#
# print(json_data['row'][1])
#
# print(type(json_data))

#
# print(json_data)
#
# json_data['b'] = []
#
# json_data.append()
#
# json_data['b'].append('{"ans":"기린"}')
# json_data['b'].append('{"sub":"동물"}')
# json_data['b'].append('{"hard":"3"}')
# json_data['b'].append('{"url":"wdawdwadn(&YH@!jb8dAYPd8UP)(@!#$:OIH#%Asdfsdf"}')
#
# json_data['c'] = []
#
# json_data['c'].append('{"ans":"하마"}')
# json_data['c'].append('{"sub":"동물"}')
# json_data['c'].append('{"hard":"5"}')
# json_data['c'].append('{"url":"ㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄷㄱㄱㄷㄱㄷㄱ"}')
# print(json_data)
#
# print(json_data['b'][0])
#
# # file = open('image.txt', 'w', encoding='utf-8')
# # file.write(data_url_receive)
# # file.close()
#
#
# print("----파일열기 시작-=-----")
# file_path = "C://Users//lhbs0//Desktop//항해99//0주차 미니프로젝트//datastorage//plzsave.json"
#
# if (os.path.isfile(file_path) == False):
#     json_start = {}
#     print("새로 만들꺼얌!")
#     with open(file_path, 'w') as outfile:
#         json.dump(json_start,outfile)
#
#
# with open(file_path, 'w') as outfile:
#     json.dump(json_data, outfile)
#
# with open(file_path, 'r') as json_file:
#     json_new = json.load(json_file)
#     print(json_new)
#
# json_new['d'] = []
# json_new['d'].append({"ans":"토마토"})
# json_new['d'].append('{"sub":"채소"}')
# json_new['d'].append('{"hard":"1"}')
# json_new['d'].append('{"url":"ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ"}')
#
# with open(file_path, 'w') as outfile:
#     json.dump(json_new, outfile, indent=4)
#
#
# print("json_new2")
# with open(file_path, 'r') as json_file:
#     json_new2 = json.load(json_file)
#     print(json_new2)
#
# print("\n-------------------\n")
#
# print(json_new2['c':'ans'])
#
#
#
#
# # img_problem["ans"] = "기린"
# # img_problem["sub"] = "동물"
# # img_problem["hard"] = "3"
# # img_problem["url"] = "wdawdwadn(&YH@!jb8dAYPd8UP)(@!#$:OIH#%Asdfsdf"


# ----카운트를 세는 구간 ----
    # count_path = "C://Users//lhbs0//Desktop//항해99//0주차 미니프로젝트//datastorage//pro_count.txt"
    #
    # if (os.path.isfile(count_path) == False):
    #     file = open('pro_count.txt', 'w', encoding='utf-8')
    #     file.close()
    #
    # file = open('pro_count.txt', 'r', encoding='utf-8')
    # data = file.read()
    # file.close()
    # if data == "":
    #     count = 0
    # else:
    #     count = int(data)
    #
    # count += 1
    #
    # file = open('pro_count.txt', 'w', encoding='utf-8')
    #
    # file.write(str(count))
    # file.close()
    #
    # # ----카운트를 세는 구간 ----