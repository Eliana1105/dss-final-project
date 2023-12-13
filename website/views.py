
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django import template
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseBadRequest
from datetime import datetime, date
import pandas as pd
import numpy as np
import os
from django.conf import settings

from mysite.settings import BASE_DIR
from sklearn import preprocessing
from sklearn.preprocessing import MinMaxScaler


@csrf_protect
def index(request):
    response = render(request, 'index.html', {})
    response['Strict-Transport-Security'] = 'max-age=2592000'
    response['X-Frame-Options'] = 'SAMEORIGIN'
    response['Referrer-Policy'] = 'no-referrer'
    response['X-XSS-Protection'] = '1; mode=block'
    response['X-Content-Type-Options'] = 'nosniff'
    response['Strict-Transport-Security'] = 'max-age=16070400; includeSubDomains'
    return response


@csrf_protect
def result(request):
    response = render(request, 'result.html', {})
    response['Strict-Transport-Security'] = 'max-age=2592000'
    response['X-Frame-Options'] = 'SAMEORIGIN'
    response['Referrer-Policy'] = 'no-referrer'
    response['X-XSS-Protection'] = '1; mode=block'
    response['X-Content-Type-Options'] = 'nosniff'
    response['Strict-Transport-Security'] = 'max-age=16070400; includeSubDomains'
    return response


@csrf_exempt
def search(request):
    result = {'status': '', 'msg': '', 'data': {}}
    file_path = os.path.join(settings.BASE_DIR, '規則.csv')
    df = pd.read_csv(file_path)
    df.head(5)
    df['水果名稱'] = df['水果名稱'].astype('category')
    df_short = df.iloc[:, 1:21].values
    rule_length = len(df_short)
    sc = MinMaxScaler(feature_range=(0, 1))
    df_short = sc.fit_transform(df_short)
    key_to_index = {
        'mydata[regionstatus][North]': 0,
        'mydata[regionstatus][Central]': 1,
        'mydata[regionstatus][South]': 2,
        'mydata[regionstatus][East]': 3,
        'mydata[humidity][Dry]': 4,
        'mydata[humidity][Moderate]': 5,
        'mydata[humidity][Moist]': 6,
        'mydata[temperature][10-15]': 7,
        'mydata[temperature][16-27]': 8,
        'mydata[temperature][28-32]': 9,
        'mydata[season][Spring]': 10,
        'mydata[season][Summer]': 11,
        'mydata[season][Autumn]': 12,
        'mydata[season][Winter]': 13,
        'mydata[difficulty][Easy]': 14,
        'mydata[difficulty][Moderate]': 15,
        'mydata[difficulty][Difficult]': 16,
        'mydata[irrigation][Insufficient]': 17,
        'mydata[irrigation][Moderate]': 18,
        'mydata[irrigation][Adequate]': 19
    }

    # 初始化一個全為 0 的 NumPy 數組
    user_input = np.zeros(len(key_to_index))
    # 更新 user_input 數組
    for key, index in key_to_index.items():
        value = request.POST.get(key, '0')  # 如果鍵不存在，預設為 '0'
        user_input[index] = int(value)

    p1 = user_input.copy()
    p2 = user_input.copy()
    p3 = user_input.copy()
    p4 = user_input.copy()
    p5 = user_input.copy()
    p6 = user_input.copy()
    p7 = user_input.copy()
    p8 = user_input.copy()

    new_user_input = np.stack((p1, p2, p3, p4, p5, p6, p7, p8), axis=0)

    weight_df = pd.read_csv('權重.csv')
    weight_array = weight_df.values
    weight_array = weight_array.reshape(-1)
    weight_array1 = weight_array.copy()
    weight_array2 = weight_array.copy()
    weight_array3 = weight_array.copy()
    weight_array4 = weight_array.copy()
    weight_array5 = weight_array.copy()
    weight_array6 = weight_array.copy()
    weight_array7 = weight_array.copy()
    weight_array8 = weight_array.copy()
    new_weight_array = np.stack((weight_array1, weight_array2, weight_array3, weight_array4, weight_array5,
                                 weight_array6, weight_array7, weight_array8), axis=0)

    final_output = df_short * new_user_input * new_weight_array
    columns = ['北', '中', '南', '東', '乾燥', '濕度中等', '濕潤', '10-15度', '16-27度', '28-32度',
                    '春', '夏', '秋', '冬', '簡易', '難易中等', '困難', '不充足', '水源中等', '充足']
    final_df = pd.DataFrame(final_output, columns=columns)
    fruit = ['雜柑', '椰子', '葡萄柚', '葡萄', '鳳梨', '香蕉', '木瓜', '蘋果']
    final_df['總計分數'] = final_df.sum(axis=1)
    final_df['水果名稱'] = fruit
    rank = final_df.sort_values(by='總計分數', ascending=False)
    # top_three_rows = rank.head(3)
    first = rank['水果名稱'].iloc[0]
    # 第二名
    second = rank['水果名稱'].iloc[1]
    # 第三名
    thrid = rank['水果名稱'].iloc[2]
    result['status'] = 'success'
    result['data'] = {
        'first': first,
        'second': second,
        'third': thrid
    }
    return JsonResponse(result, safe=False)
