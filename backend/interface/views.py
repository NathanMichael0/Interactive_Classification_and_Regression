from django.shortcuts import render, redirect  
from django.http import JsonResponse
from flask import jsonify
import json
import pandas as pd
import csv



    # Create your views here.  
def emp(request):  
        if request.method == "POST":  
            print("posted")
        else:  
            print("")
        return render(request,'index.html',{'form':"form"})  
def show(request):  
        #if request.method == "POST":  
        print("showing req",json.loads(request.body))
        return JsonResponse({"hello":"kjhbg"})

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