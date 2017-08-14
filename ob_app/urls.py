from django.conf.urls import url
import django.contrib.auth.views
from ob_app.views import *


urlpatterns = [
    url(
        r'^$',
        user_login,
        name='home'),
    url(
        r'^inicio/(?P<pk>\w+)$',
        Home_Client.as_view(),
        name='inicio'),
    url(
        r'^salir',
        Logout.as_view(),
        name='logout_success'),
    url(
        r'^logout',
        django.contrib.auth.views.logout,
        {
            'next_page': 'logout_success'
        },
        name='salir'),
    url(
        r'^registro-exitoso',
        Register_success.as_view(),
        name='registro-exitoso'),
    url(
        r'^cuenta-activada/',
        Account_activate.as_view(),
        name='cuenta-activada'),
    url(
        r'^nueva-pass-exitosa',
        Restore_pass_success.as_view(),
        name='nueva-pass-exitosa'),
    url(
        r'^registro$',
        Register.as_view(),
        name='registro'),
    url(
        r'^ajax/validate-user/$',
        validate_user,
        name='validar-user'),
    url(
        r'^ajax/validate-user-forget/$',
        validate_user_forgot,
        name='validar-user'),
    url(
        r'^ajax/validate-email/$',
        validate_email,
        name='validar-email'),
    url(
        r'^ajax/validate-cod/$',
        validate_cod,
        name='validar-cod'),
    url(
        r'^ajax/validate-pass/$',
        validate_pass,
        name='validar-pass'),
    url(
        r'^ajax/validate-elems-seguridad/$',
        validate_elems,
        name='validar-elems'),
    url(
        r'^ajax/validate-pass-forgot/$',
        validate_pass_forgot,
        name='validate-pass-forgot'),
    url(
        r'^ajax/validate_passw/$',
        old_pass,
        name='validate-pass-forgot'),
    url(
        r'^ajax/resend-email/$',
        resend_email,
        name='reenvio-confirmacion'),
    url(
        r'^ajax/validate-questions/$',
        validate_quest,
        name='validar-preguntas'),
    url(
        r'^ajax/modify-profile/$',
        modify_profile,
        name='modificar-perfil'),
    url(
        r'^ajax/first-login/$',
        first_login,
        name='primer-login'),
    url(
        r'^activate/(?P<activation_key>\w+)/$',
        register_confirm,
        name='register_confirm'),
    url(
        r'^newToken/(?P<pk>\d+)/$',
        new_token,
        name='new_Token'),
    url(
        r'^restablecer-pass',
        Restore_pass.as_view(),
        name='restablecer-pass'),
    url(
        r'^(?P<pk>\w+)/consultar-cuenta/(?P<acc_id>\w+)/',
        Account.as_view(),
        name='consultar-cuenta'),
    url(
        r'^(?P<pk>\w+)/consultar-tdc/(?P<tdc_id>\w+)/',
        Tdc.as_view(),
        name='consultar-tdc'),
    url(
        r'^(?P<pk>\w+)/consultar-prestamo/(?P<id>\w+)/',
        Loans.as_view(),
        name='consultar-prestamo'),
    url(
        r'^(?P<pk>\w+)/transf-mis-cuentas/(?P<id>\w+)/$',
        Transfer_my_acc.as_view(),
        name='transf-mis-cuentas'),
    url(
        r'^(?P<pk>\w+)/transf-mi-banco/(?P<id>\w+)/$',
        Transfer_my_bank.as_view(),
        name='transf-mi-banco'),
    url(
        r'^(?P<pk>\w+)/transf-otros-bancos/(?P<id>\w+)/$',
        Transfer_others_bank.as_view(),
        name='transf-otros-bancos'),
    url(
        r'^(?P<pk>\w+)/datos-transferencia/(?P<transfer>\w+)/',
        DataTransfer.as_view(),
        name='datos-transferencia'),
    url(
        r'^(?P<pk>\w+)/transferencia-exitosa',
        Success.as_view(),
        name='transferencia-exitosa'),
    url(
        r'^(?P<pk>\w+)/pagos',
        Payments.as_view(),
        name='pagos'),
    url(
        r'^(?P<pk>\w+)/datos-pago/(?P<payment>\w+)/',
        DataPayment.as_view(),
        name='datos-pago'),
    url(
        r'^pago-exitoso',
        Success_Payments.as_view(),
        name='pago-exitoso'),
    url(
        r'^(?P<pk>\w+)/registro-afiliados',
        Register_Affiliate.as_view(),
        name='registro-afiliados'),
    url(
        r'^registro-servicios',
        Register_Services.as_view(),
        name='registro-servicios'),
    url(
        r'^(?P<pk>\w+)/solicitudes$',
        Request.as_view(),
        name='solicitudes'),
    url(
        r'^(?P<pk>\w+)/solicitudes/Tarjeta-Coordenadas$',
        Request_Coord.as_view(),
        name='solicitud-tarjeta-coordenadas'),
    url(
        r'^(?P<pk>\w+)/solicitudes/Chequeras$',
        Request_Checkbook.as_view(),
        name='solicitud-chequeras'),
    url(
        r'^(?P<pk>\w+)/solicitudes/Cita$',
        Request_Appointment.as_view(),
        name='solicitud-citas'),
    url(
        r'^(?P<pk>\w+)/solicitudes/Referencias$',
        Request_References.as_view(),
        name='solicitud-referencias'),
    url(
        r'^solicitudes/Cita/exitosa$',
        Request_Appointment_Success.as_view(),
        name='solicitud-citas-exitosa'),
    url(
        r'^solicitudes/Chequeras/exitosa$',
        Request_Checkbook_Success.as_view(),
        name='solicitud-chequeras-exitosa'),
    url(
        r'^solicitudes/Referencias/exitosa$',
        Request_References_Success.as_view(),
        name='solicitud-referencias-exitosa'),
    url(
        r'^(?P<pk>\w+)/gestion-productos$',
        Management.as_view(),
        name='gestion-productos'),
    url(
        r'^(?P<pk>\w+)/perfil-seguridad$',
        Profile.as_view(),
        name='perfil-seguridad'),
    url(
        r'^(?P<pk>\w+)/ayuda$',
        Help.as_view(),
        name='ayuda'),
]