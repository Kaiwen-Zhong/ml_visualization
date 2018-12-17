#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct 28 11:18:58 2018

@author: raj
"""



    
from flask import (
    Flask,
    render_template, request
)

import pandas as pd
from flask import jsonify
import json
import numpy as np

# Create the application instance
app = Flask(__name__)

@app.route('/')
def signUp():
    return render_template('website_new.html')

# Create a URL route in our application for "/"
@app.route('/data_dive',  methods = ['POST'])
def home():
   xaxis = request.form['x_axis']  
   yaxis = request.form['y_axis']  
   
   data = pd.read_csv("../Data/mock_data_final_int_3.csv")
   
   var1 = data[xaxis].tolist()
   
   var2 = data[yaxis].tolist()
   
   var3 = data['response'].tolist()
   
   data_dict = [{xaxis: var1, yaxis: var2, 'response': var3} for var1, var2, var3 in zip(var1, var2, var3)]
   
   data_json = json.dumps(data_dict)


   
   
   return data_json


if __name__ == '__main__':
    app.run(debug=True)
    

