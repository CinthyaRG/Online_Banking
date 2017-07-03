from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db import models

# Validador para cédula
ID_VALIDATOR = RegexValidator(
    regex=r'^[VE]{1}-\d{6,8}$',
    message="Formato de cédula inválido.",
)


class Card_coor(models.Model):
    serial = models.CharField(max_length=30, unique=True)
    coor = models.CharField(max_length=120)
    status = models.BooleanField(default=False)


class Elems_security(models.Model):
    question1 = models.CharField(max_length=50)
    answer1 = models.CharField(max_length=50)
    question2 = models.CharField(max_length=50)
    answer2 = models.CharField(max_length=50)
    card_coor = models.ForeignKey(Card_coor)


class Users(models.Model):
    user = models.OneToOneField(User)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    ident = models.CharField(validators=[ID_VALIDATOR], max_length=10)
    elem_security = models.ForeignKey(Elems_security)


def get_name(self):
    return self.first_name + " " + self.last_name


def __str__(self):
    return str(self.ident) + " " + self.first_name + " " + self.last_name
