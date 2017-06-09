from django.shortcuts import render
from django.views.generic import *


class Home(TemplateView):
    template_name = 'base-index.html'


class Home_Client(TemplateView):
    template_name = 'base.html'


class Logout(TemplateView):
    template_name = 'logout.html'


class Register_success(TemplateView):
    template_name = 'register_success.html'

class Restore_pass_success(TemplateView):
    template_name = 'restore_pass.html'
