from django.conf.urls import url
from . import views

urlpatterns = [
    url('', views.edit, name = 'index'),
    url('emp', views.emp, name='interface'),
    url('show/', views.show, name = 'upload.csv'),
    

    
]