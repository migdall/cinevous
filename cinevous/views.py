from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.contrib.auth.models import User


def index(request):
    template = loader.get_template('cinevous/index.html')
    context = {}
    return HttpResponse(template.render(context, request))


@csrf_protect
def login_view(request):
    if request.POST:
        email = request.POST['email']
        password = request.POST['password']
        database_user = User.objects.get(email=email)
        user = authenticate(request, username=database_user.username, password=password)
        print("Authenticated user:", user)
        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return redirect('app')

    template = loader.get_template('cinevous/login.html')
    context = {}
    return HttpResponse(template.render(context, request))


def logout_view(request):
    logout(request)
    return redirect('login')


class AppProtectedView(LoginRequiredMixin, TemplateView):
    template_name = 'app.html'
    login_url = '/login/'
