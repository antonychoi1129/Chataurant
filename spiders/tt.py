
import json

with open('data.json', 'r+') as f:
    data = json.load(f)
    for i in data:
        temp = i['loc']['coordinates'][0]
        i['loc']['coordinates'][0] = i['loc']['coordinates'][1]
        i['loc']['coordinates'][1] = temp
        if(i['loc']['coordinates'][0] == None):
            print(i['name'])

    # with open('data.json', 'a', encoding='utf-8') as outfile:
    #         json.dump(data, outfile, ensure_ascii=False, indent=4)

    f.close()