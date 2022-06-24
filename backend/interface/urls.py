from django.conf.urls import url
from . import views

urlpatterns = [
    url('', views.edit, name = 'index'),
    url('reg', views.reg, name='interface'),
    url('clf/', views.clf, name = 'upload.csv'),
    

    
]