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
def reg(request):  
        targetClass = json.loads(request.body)["tgtClass"]
        newCsv = pd.DataFrame(json.loads(request.body)["newJsonCsv"])
        testSize = json.loads(request.body)["ttestsize"]
        parameterString =json.loads(request.body)["parameters"]
        userChoice = json.loads(request.body)["classReg"]
        featureImp = []
        rocArr = []

        print(newCsv.head())

        X =  newCsv.drop(targetClass, axis=1)
        y = newCsv[targetClass]

  
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=testSize)
        if (userChoice == "linreg"):
            reg_clf =  eval("LinearRegression("+parameterString[0:len(parameterString) -1]+")") 
            


        elif (userChoice == "logreg"):
             reg_clf =  eval("LogisticRegression("+parameterString[0:len(parameterString) -1]+")")  
            



        elif (userChoice == "ridgereg"):
             reg_clf =  eval("Ridge("+parameterString[0:len(parameterString) -1]+")") 
            
        
 
        


        return JsonResponse({"meanCvScore":"", "featureImp": featureImp,})

def clf(request):  
        #if request.method == "POST":  
        #print("showing req",json.loads(request.body))

        targetClass = json.loads(request.body)["tgtClass"]
        newCsv = pd.DataFrame(json.loads(request.body)["newJsonCsv"])
        testSize = json.loads(request.body)["ttestsize"]
        parameterString =json.loads(request.body)["parameters"]
        userChoice = json.loads(request.body)["classReg"]
        featureImp = []
        rocArr = []

        print(newCsv.head())

        X =  newCsv.drop(targetClass, axis=1)
        y = newCsv[targetClass]

  
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=testSize)


        if (userChoice == "logreg"):
            reg_clf =  eval("LogisticRegression("+parameterString[0:len(parameterString) -1]+")") 
            reg_clf.fit(X_train, y_train)
            i=0
            for name in (reg_clf.feature_names_in_):
                featureImp.append({"name":name,"coef":(reg_clf.coef_)[0][i]})
                i+=1

            logreg_probs = reg_clf.predict_proba(X_test)
            logreg_preds = logreg_probs[:,1]
            logreg_fpr, logreg_tpr, logreg_threshold = metrics.roc_curve(y_test, logreg_preds)
            auc = metrics.auc(logreg_fpr, logreg_tpr)

            i=0          
            for j in (list(logreg_tpr)):
                rocArr.append({"tpr":j,"fpr":(list(logreg_fpr))[i]})
                i+=1


        elif (userChoice == "linsvc"):
             reg_clf =  eval("LinearSVC("+parameterString[0:len(parameterString) -1]+")")  
             reg_clf.fit(X_train, y_train)  
             i=0          
             for name in (reg_clf.feature_names_in_):
                featureImp.append({"name":name,"coef":(reg_clf.coef_)[0][i]})
                i+=1

             svm_probs = reg_clf.decision_function(X_test)
             svm_preds = svm_probs
             svm_fpr, svm_tpr, svm_threshold = metrics.roc_curve(y_test, svm_preds)
             auc = metrics.auc(svm_fpr, svm_tpr)   


             i=0          
             for j in (list(svm_tpr)):
                rocArr.append({"tpr":j,"fpr":(list(svm_fpr))[i]})
                i+=1   



        elif (userChoice == "rand"):
             reg_clf =  eval("RandomForestClassifier("+parameterString[0:len(parameterString) -1]+")") 
             reg_clf.fit(X_train, y_train)
             
        
             for name, score in zip(newCsv, reg_clf.feature_importances_):
                featureImp.append({"name":name,"score":score})
             rf_probs = reg_clf.predict_proba(X_test)
             rf_preds = rf_probs[:,1]
             rf_fpr, rf_tpr, rf_threshold = metrics.roc_curve(y_test, rf_preds)
             auc = metrics.auc(rf_fpr, rf_tpr)  
              


             i=0          
             for j in (list(rf_tpr)):
                rocArr.append({"tpr":j,"fpr":(list(rf_fpr))[i]})
                i+=1





             
             #rocArr= [{"tpr": list(rf_tpr), "fpr":list(rf_fpr), "rocauc":rf_roc_auc}]


  

       #logreg_clf = LogisticRegression(solver='liblinear')

        

# Perform a 10-fold cross validation with scoring='roc_auc'
# Note: cross validation should be done on the whole X
        cv_score = cross_val_score(reg_clf, X,np.ravel(y), cv=10, scoring='roc_auc')


        print("Mean CV Score ", cv_score.mean())  
       
            

        return JsonResponse({"meanCvScore":(cv_score.mean()), "featureImp": featureImp, "roc": rocArr, "auc":auc})





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