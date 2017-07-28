from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db import models

# Validador para cédula
ID_VALIDATOR = RegexValidator(
    regex=r'^[VE]{1}-\d{6,8}$',
    message="Formato de cédula inválido.",
)
IDEN_VALIDATOR = RegexValidator(
    regex=r'^[VEJ]{1}-\d{6,9}$',
    message="Formato de cédula inválido.",
)


class CardCoor(models.Model):
    serial = models.CharField(max_length=30, unique=True)
    coor = models.CharField(max_length=120)
    status = models.BooleanField(default=False)


class ElemSecurity(models.Model):
    question1 = models.CharField(max_length=50)
    answer1 = models.CharField(max_length=50)
    question2 = models.CharField(max_length=50)
    answer2 = models.CharField(max_length=50)
    cardCoor = models.OneToOneField(CardCoor, blank=True, null=True)


class Customer(models.Model):
    user = models.OneToOneField(User)
    ref = models.CharField(max_length=15)
    ident = models.CharField(validators=[ID_VALIDATOR], max_length=10, unique=True)
    elemSecurity = models.OneToOneField(ElemSecurity, blank=True, null=True)
    passExpires = models.DateField(null=True, blank=True)
    lastLogin = models.DateTimeField(null=True, blank=True)

    def get_name(self):
        first_name = self.user.first_name.split(' ')
        last_name = self.user.last_name.split(' ')
        name = first_name[0] + " " + first_name[1][0] + ". "
        name = name + last_name[0] + " " + last_name[1][0] + "."

        return name

    def get_last_login(self):
        formato = "%d/%m/%y %I:%M:%S %p"
        if self.lastLogin is None:
            return ''

        date_time = self.lastLogin.strftime(formato).split(" ")
        date = date_time[0]
        time = date_time[1] + " " + date_time[2]
        return date + " " + time

    def __str__(self):
        return str(self.ident) + " " + self.user.first_name + " " + self.user.last_name


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    activationKey = models.CharField(max_length=40, blank=True)
    keyExpires = models.DateTimeField()
    intent = models.IntegerField(default=0)
    dateIntent = models.DateField(null=True, blank=True)


class Affiliate(models.Model):
    bank = models.CharField(max_length=128)
    numAccount = models.CharField(max_length=20, blank=False)
    name = models.CharField(max_length=64)
    ident = models.CharField(validators=[IDEN_VALIDATOR], max_length=11, unique=True)
    email = models.EmailField()
    alias = models.CharField(max_length=40)
    customer = models.ForeignKey(Customer)


class Service(models.Model):
    ident = models.CharField(validators=[IDEN_VALIDATOR], max_length=11, unique=True, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    numCard = models.CharField(max_length=16, blank=True, null=True)
    identService = models.CharField(max_length=32)
    alias = models.CharField(max_length=40)
    customer = models.ForeignKey(Customer)
