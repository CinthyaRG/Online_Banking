#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django import forms


class EmailForm(forms.ModelForm):

    email = forms.CharField(
        max_length= 60, label="email",
        required=True, widget=forms.EmailInput(attrs={
            'class': "input-register",
            'placeholder': "ej: nombre@ejemplo.com"
        })
    )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']
