from django.conf.urls import url
import django.contrib.auth.views
from Online_Banking_App.views import *


urlpatterns = [
    url(
        r'^$',
        Home.as_view(),
        name='home'),
    url(
        r'^inicio',
        Home_Client.as_view(),
        name='inicio'),
    url(
        r'^salir',
         Logout.as_view(),
         name='salir'),
    url(
        r'^registro-exitoso',
        Register_success.as_view(),
        name='registro-exitoso'),
    url(
        r'^nueva-pass-exitosa',
        Restore_pass_success.as_view(),
        name='nueva-pass-exitosa'),
]