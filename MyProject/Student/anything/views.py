from django.shortcuts import render

def home(request):
    data={
        'name': 'abc'
    }
    context={}
    if request.method=='post':
        username=request.post.get('username')
        if username:
            context['username']=username
            
    return render(request, "home.html",data)