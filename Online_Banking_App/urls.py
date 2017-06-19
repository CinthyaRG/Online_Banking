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
  url(
    r'^registro',
    Register.as_view(),
    name='registro'),
  url(
    r'^restablecer-pass',
    Restore_pass.as_view(),
    name='restablecer-pass'),
  url(
    r'^consultar-cuenta/(?P<pk>\d+)/',
    Account.as_view(),
    name='consultar-cuenta'),
  url(
    r'^consultar-tdc/(?P<pk>\d+)/',
    Tdc.as_view(),
    name='consultar-tdc'),
  url(
    r'^consultar-prestamo/(?P<pk>\d+)/',
    Loans.as_view(),
    name='consultar-prestamo'),
  url(
    r'^transf-mis-cuentas',
    Transfer_my_acc.as_view(),
    name='transf-mis-cuentas'),
]