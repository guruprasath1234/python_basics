from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer


def home(request):
    data = {
        'name': 'abc'
    }

    context = {}

    if request.method == 'POST':
        username = request.POST.get('username')
        if username:
            context['username'] = username

    data.update(context)
    return render(request, "home.html", data)


@api_view(['GET'])
def student_list(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)