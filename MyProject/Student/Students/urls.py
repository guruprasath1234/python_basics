from django.contrib import admin
from django.urls import path
from anything import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('students/', views.students_list, name='student_list'),
]