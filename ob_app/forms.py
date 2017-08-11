#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=18, label=' Número De Tarjeta ',
        required=False, widget=forms.TextInput(attrs={
            'class': "form-control text-center",
            'id': "id_username",
            'placeholder': ""
        })
    )

    password = forms.CharField(
        label="Contraseña ", required=False, widget=forms.PasswordInput(attrs={
            'class': "form-control text-center",
            'type': "password",
            'id': "id_password"
        })
    )


class ProfileForm(forms.Form):
    email = forms.EmailField(
        label=' Email: ',
        required=False, widget=forms.TextInput(attrs={
            'class': "input-register",
            'id': "email_user",
            'placeholder': ""
        })
    )

    first_quest = forms.CharField(
        max_length=50, label=' Pregunta 1: ',
        required=False, widget=forms.TextInput(attrs={
            'class': "input-register",
            'id': "quest1",
            'placeholder': "",
            'onkeyup': "count_words('#span_quest1','#quest1')",
            'onfocus': "count_words('#span_quest1','#quest1')",
            'onclick': "remove_count('#span_quest1')"
        })
    )

    first_answ = forms.CharField(
        max_length=50, label=' Respuesta 1: ',
        required=False, widget=forms.TextInput(attrs={
            'class': "input-register",
            'id': "answ1",
            'placeholder': "",
            'onkeyup': "count_words('#span_answ1','#answ1')",
            'onfocus': "count_words('#span_answ1','#answ1')",
            'onclick': "remove_count('#span_answ1')"
        })
    )

    second_quest = forms.CharField(
        max_length=50, label=' Pregunta 2: ',
        required=False, widget=forms.TextInput(attrs={
            'class': "input-register",
            'id': "quest2",
            'placeholder': "",
            'onkeyup': "count_words('#span_quest2','#quest2')",
            'onfocus': "count_words('#span_quest2','#quest2')",
            'onclick': "remove_count('#span_quest2')"
        })
    )

    second_answ = forms.CharField(
        max_length=50, label=' Respuesta 2: ',
        required=False, widget=forms.TextInput(attrs={
            'class': "input-register",
            'id': "answ2",
            'placeholder': "",
            'onkeyup': "count_words('#span_answ2','#answ2')",
            'onfocus': "count_words('#span_answ2','#answ2')",
            'onclick': "remove_count('#span_answ2')"
        })
    )

    password = forms.CharField(
        label="Contraseña: ", required=False, widget=forms.PasswordInput(attrs={
            'class': "password input-register",
            'type': "password",
            'id': "password"
        })
    )

    confirm_pass = forms.CharField(
        label="Contraseña: ", required=False, widget=forms.PasswordInput(attrs={
            'class': "password input-register",
            'type': "password",
            'id': "confirm-pass"
        })
    )
