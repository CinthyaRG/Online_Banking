from django.shortcuts import render
from django.views.generic import *


class Home(TemplateView):
    template_name = 'base-index.html'


class Home_Client(TemplateView):
    template_name = 'base.html'
