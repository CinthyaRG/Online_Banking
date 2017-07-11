from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import get_template
from django.contrib.auth.models import User, Group
from django.views.decorators.csrf import ensure_csrf_cookie
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.core.mail import EmailMessage
from django.views.generic import *
from ob_app.forms import *
from ob_app.models import *
import datetime
import random
import hashlib


def groups():
    nombres_grupo = ["Administrador", "Clientes"]

    for group in nombres_grupo:
        if Group.objects.filter(name=group).count() == 0:
            Group.objects.create(name=group)


@ensure_csrf_cookie
def validate_user(request):
    groups()
    ci = request.GET.get('ci', None)
    data = {
        'user_exists': Users.objects.filter(ident=ci).exists()
    }

    if data['user_exists']:
        data['error'] = "Usted ya se encuentra registrado. Si olvidó su clave " \
                        "ingrese a Olvidé mi contraseña"

    return JsonResponse(data)


@ensure_csrf_cookie
def validate_email(request):
    email = request.GET.get('email', None)
    first_name = request.GET.get('first_name', None)
    last_name = request.GET.get('last_name', None)
    ci = request.GET.get('ci', None)
    username = request.GET.get('username', None)
    print(username)
    data = {
        'user_exists': Users.objects.filter(ident=ci).exists()
    }

    if not (data['user_exists']):
        if User.objects.filter(username=username).count() > 0:
            user = User.objects.get(username=username)
            user.delete()

        user = User(first_name=first_name,
                    last_name=last_name,
                    email=email,
                    username=username)
        user.is_active = False
        group = Group.objects.get(name="Clientes")
        try:
            activation_key = create_token(6)
            while UserProfile.objects.filter(activation_key=activation_key).count() > 0:
                activation_key = create_token(6)
            # mypath = os.getcwd()
            # path = Path('/Online_Banking/static/img/logo.png')
            # path = mypath + path
            # print(path)
            # file = open(path, "rb")
            # attach_image = MIMEImage(file.read())
            # attach_image.add_header('Content-Disposition', 'attachment; filename = "logo.png"')
            # msg.attach(attach_image)
            c = {'usuario': user.get_full_name,
                 'key': activation_key}
            subject = 'Actio Capital - Confirmación de Email'
            message_template = 'confirm-email.html'
            email = user.email
            send_email(subject, message_template, c, email)
            data['envio'] = True
        except:
            data['envio'] = False
            return JsonResponse(data)

        user.save()
        user.groups.add(group)
        key_expires = datetime.datetime.today() + datetime.timedelta(minutes=2)
        user_profile = UserProfile(user=user,
                                   activation_key=activation_key,
                                   key_expires=key_expires)
        user_profile.save()

    return JsonResponse(data)


@ensure_csrf_cookie
def validate_cod(request):
    username = request.GET.get('username', None)
    token = request.GET.get('cod', None)

    data = {
        'user_exists': User.objects.filter(username=username).exists()
    }

    if data['user_exists']:
        user = User.objects.get(username=username)

        try:
            user_profile = UserProfile.objects.get(user=user, activation_key=token)
        except UserProfile.DoesNotExist:
            data['correct'] = False
            data['error'] = 'El código que ingresó es incorrecto.'
            return JsonResponse(data)

        time = datetime.datetime.today()

        if user_profile.key_expires < time:
            data['profile_expires'] = True
            data['correct'] = False
        else:
            data['correct'] = True

        if not(data['correct']):
            if data['profile_expires']:
                data['error'] = 'El código que ingresó ya expiró. Presione Renviar Código ' \
                                'para solicitar uno nuevo.'
    else:
        data['error'] = 'Ha ocurrido un error por favor reingrese sus datos.'

    return JsonResponse(data)


@ensure_csrf_cookie
def validate_pass(request):
    username = request.GET.get('username', None)
    q1 = request.GET.get('question1', None)
    q2 = request.GET.get('question2', None)
    a1 = request.GET.get('answer1', None)
    a2 = request.GET.get('answer2', None)
    password = request.GET.get('password', None)
    ci = request.GET.get('ci', None)

    data = {
        'user_exists': User.objects.filter(username=username).exists()
    }

    if data['user_exists']:
        user = User.objects.get(username=username)
        
        try:
            activation_key = create_token(8)
            while UserProfile.objects.filter(activation_key=activation_key).count() > 0:
                activation_key = create_token(8)
            c = {'usuario': user.get_full_name,
                 'key': activation_key,
                 'host': request.META['HTTP_HOST']}
            subject = 'Actio Capital - Activación de cuenta'
            message_template = 'register-success-email.html'
            email = user.email
            send_email(subject, message_template, c, email)
        except:
            data['correct'] = False
            return JsonResponse(data)

        user.set_password(password)
        user.save()

        elem_sec = Elems_security(question1=q1,
                                answer1=a1,
                                question2=q2,
                                answer2=a2)
        elem_sec.save()

        pass_expires = datetime.datetime.today() + datetime.timedelta(days=180)
        customer = Users(user=user,
                    ident=ci,
                    elem_security=elem_sec,
                    pass_expires=pass_expires)
        customer.save()      

        key_expires = datetime.datetime.today() + datetime.timedelta(days=1)
        user_profile = UserProfile.objects.get(user=user)
        user_profile.activation_key= activation_key
        user_profile.key_expires= key_expires
        user_profile.save()

        data['correct'] = True
    else:
        data['error'] = 'Ha ocurrido un error por favor reingrese sus datos.'

    return JsonResponse(data)


@ensure_csrf_cookie
def resend_email(request):
    username = request.GET.get('username', None)
    print(username)
    data = {
        'user_exists': User.objects.filter(username=username).exists()
    }

    if data['user_exists']:
        user = User.objects.get(username=username)

        try:
            activation_key = create_token(6)
            while UserProfile.objects.filter(activation_key=activation_key).count() > 0:
                activation_key = create_token(6)
            c = {'usuario': user.get_full_name,
                 'key': activation_key}
            subject = 'Actio Capital - Reenvío de Código'
            message_template = 'confirm-email.html'
            email = user.email
            send_email(subject, message_template, c, email)
            data['envio'] = True
        except:
            data['envio'] = False
            return JsonResponse(data)

        key_expires = datetime.datetime.today() + datetime.timedelta(minutes=2)
        user_profile = UserProfile.objects.get(user=user)
        user_profile.activation_key = activation_key
        user_profile.key_expires = key_expires
        user_profile.save()

    else:
        data['error'] = 'Ha ocurrido un error por favor reingrese sus datos.'

    return JsonResponse(data)


def send_email(subject, message_template, context, email):
    from_email = 'Actio Capital'
    email_subject = subject
    message = get_template(message_template).render(context)
    msg = EmailMessage(email_subject, message, to=[email], from_email=from_email)
    msg.content_subtype = 'html'
    msg.send()
    print("Se envió exitosamente el correo.")


def create_token(num):
    chars = list('ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz0123456789')
    random.shuffle(chars)
    chars = ''.join(chars)
    sha1 = hashlib.sha1(chars.encode('utf8'))
    token = sha1.hexdigest()
    key = token[:num]
    return key


def new_Token(request, pk):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse_lazy('logout'))

    user = User.objects.get(pk=pk)
    UserProfile.objects.filter(user=user).delete()
    key = create_token()
    key_expires = datetime.datetime.today() + datetime.timedelta(days=1)
    new_profile = UserProfile(user=user, activation_key=key,
                              key_expires=key_expires)
    try:
        c = {'usuario': user.get_full_name,
             'key': key,
             'host': request.META['HTTP_HOST']}
        subject = 'Actio Capital - Código Activación de cuenta'
        message_template = 'register-success-email.html'
        email = user.email
        send_email(subject, message_template, c, email)
    except:
        render(request, 'register_success.html', c)
    
    new_profile.save()
    return render(request, 'register_success.html', c)


def register_confirm(request, activation_key):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse_lazy('logout'))

    user_profile = get_object_or_404(UserProfile,
                                     activation_key=activation_key)
    user = user_profile.user

    time = datetime.datetime.today()

    if user_profile.key_expires < time:
        return HttpResponseRedirect(reverse_lazy('new_Token',
                                                 kwargs={'pk': user.pk}))

    c = {'usuario': user.get_full_name,
         'host': request.META['HTTP_HOST']}

    if request.method == 'GET':
        user.is_active = True
        user.save()
        try:
            subject = 'Actio Capital - Cuenta Activada'
            message_template = 'account-active.html'
            email = user.email
            send_email(subject, message_template, c, email)
        except:
            pass

    return render(request, 'acc-active.html')


class Home(TemplateView):
    template_name = 'base-index.html'


class Home_Client(TemplateView):
    template_name = 'base.html'


class Logout(TemplateView):
    template_name = 'logout.html'


class Register_success(TemplateView):
    template_name = 'register_success.html'


class Account_activate(TemplateView):
    template_name = 'acc-active.html'


class Restore_pass_success(TemplateView):
    template_name = 'restore_pass_success.html'


class Register(TemplateView):
    template_name = 'register.html'


class Active(TemplateView):
    template_name = 'account-active.html'


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
