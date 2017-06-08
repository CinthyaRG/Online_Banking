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
]