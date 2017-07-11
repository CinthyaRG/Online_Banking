#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=18, label=' Número De Tarjeta ',
        required=True, widget=forms.TextInput(attrs={
            'class': "form-control text-center",
            'id': "id_username",
            'placeholder': ""
        })
    )

    password = forms.CharField(
        label="Contraseña ", required=True, widget=forms.PasswordInput(attrs={
            'class': "form-control text-center",
            'type': "password",
            'id': "id_password"
        })
    )
