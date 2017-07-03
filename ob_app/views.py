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
    template_name = 'register.html'


class Restore_pass(TemplateView):
    template_name = 'forgot_password.html'


class Account(TemplateView):
    template_name = 'accounts.html'


class Tdc(TemplateView):
    template_name = 'tdc.html'


class Loans(TemplateView):
    template_name = 'loans.html'


class Transfer_my_acc(TemplateView):
    template_name = 'trans_my_acc.html'


class Transfer_my_bank(TemplateView):
    template_name = 'trans_my_bank.html'


class Transfer_others_bank(TemplateView):
    template_name = 'trans_other_bank.html'


class DataTransfer(TemplateView):
    template_name = 'transfer-data.html'


class Success(TemplateView):
    template_name = 'transfer-success.html'


class Payments(TemplateView):
    template_name = 'payments.html'


class DataPayment(TemplateView):
    template_name = 'payment-data.html'


class Success_Payments(TemplateView):
    template_name = 'payments-success.html'


class Register_Affiliate(TemplateView):
    template_name = 'register-affiliate.html'


class Register_Services(TemplateView):
    template_name = 'register-services.html'


class Request(TemplateView):
    template_name = 'request.html'


class Request_Coord(TemplateView):
    template_name = 'req-tar-coor.html'


class Request_Checkbook(TemplateView):
    template_name = 'req-checkb.html'


class Request_Appointment(TemplateView):
    template_name = 'req-appointment.html'


class Request_References(TemplateView):
    template_name = 'req-reference.html'


class Request_References_Success(TemplateView):
    template_name = 'req-reference_success.html'


class Request_Appointment_Success(TemplateView):
    template_name = 'req-appointment_success.html'


class Request_Checkbook_Success(TemplateView):
    template_name = 'req-checkb_success.html'


class Management(TemplateView):
    template_name = 'management-products.html'


class Profile(TemplateView):
    template_name = 'profile-security.html'


class Help(TemplateView):
    template_name = 'help.html'

