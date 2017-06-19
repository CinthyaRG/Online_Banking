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
    template_name = 'restore_pass_success.html'


class Register(TemplateView):
    template_name = 'register2.html'


class Restore_pass(TemplateView):
    template_name = 'forgot_password.html'


class Account(TemplateView):
    template_name = 'accounts.html'


class Tdc(TemplateView):
    template_name = 'tdc.html'
