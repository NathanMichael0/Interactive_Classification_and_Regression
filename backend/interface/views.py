from django.shortcuts import render, redirect  
from django.http import JsonResponse
from flask import jsonify
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_curve
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.pipeline import make_pipeline
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score
import matplotlib as mpl
import matplotlib.pyplot as plt
from sklearn import metrics
from nltk.classify.scikitlearn import SklearnClassifier
from sklearn.svm import SVC



    # Create your views here.  
def emp(request):  
        if request.method == "POST":  
            print("posted")
        else:  
            print("")
        return render(request,'index.html',{'form':"form"})  
def show(request):  
        #if request.method == "POST":  
        #print("showing req",json.loads(request.body))

        targetClass = json.loads(request.body)["tgtClass"]
        newCsv = pd.DataFrame(json.loads(request.body)["newJsonCsv"])
        testSize = json.loads(request.body)["ttestsize"]
        parameterString =json.loads(request.body)["parameters"]
        userChoice = json.loads(request.body)["classReg"]

        print(newCsv.head())

        X =  newCsv.drop(targetClass, axis=1)
        y = newCsv[targetClass]

  
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=testSize)

 

        if (userChoice == "logreg"):
            reg_clf =  eval("LogisticRegression("+parameterString[0:len(parameterString) -1]+")") 
        elif (userChoice == "linsvc"):
             reg_clf =  eval("LinearSVC("+parameterString[0:len(parameterString) -1]+")") 
        elif (userChoice == "rand"):
             reg_clf =  eval("RandomForestClassifier("+parameterString[0:len(parameterString) -1]+")") 


  

       #logreg_clf = LogisticRegression(solver='liblinear')

        

# Perform a 10-fold cross validation with scoring='roc_auc'
# Note: cross validation should be done on the whole X
        cv_score = cross_val_score(reg_clf, X,np.ravel(y), cv=10, scoring='roc_auc')


        print("Mean CV Score ", cv_score.mean())  
        reg_clf.fit(X_train, y_train)
        featureImp = []
        
        for name, score in zip(newCsv, reg_clf.feature_importances_):
            featureImp.append({"name":name,"score":score})
            

        return JsonResponse({"meanCvScore":(cv_score.mean()), "featureImp": featureImp})





def edit(request):  
    #print("showing req",(request.body))
   # data = {}
    if "GET" == request.method:
       return render(request, "uploadcsv.html",{})

    #csv_file = request.FILES["csv_file"].temporary_file_path()
    csv_file = (request.FILES)['files[]']
    print("csv file here ",csv_file)
    csv_data =  pd.read_csv(csv_file)
    jsonArray = csv_data.to_json(orient="records")

    
  
    #convert python jsonArray to JSON String and write to file
    

	
	
    
	
    print(csv_data.head())

  
    retData = {"csvdata":(json.loads(jsonArray))};

  
    return JsonResponse (retData)

   

        
         
def update(request, id):  

        return render(request, 'edit.html', {'employee': "employee"})  
def destroy(request, id):  

        return redirect("/show")  