################################################################################
                      INSTALACION EN AMBIENTE DE DESSARROLLO
################################################################################

0. CONSIDERACIONES
################################################################################

  - SISTEMA OPERATIVO: Linux.
  - PYTHON: Python 3.5
  - PIP: Para python v3.
  - DJANGO: Versión 1.11
  - BASE DE DATOS: PostgreSQL


2. REQUERIMIENTOS PYTHON
################################################################################

Asegurarse de tener python 3.5 y la version de pip para python 3.5

    $ pip -v

Ir al directorio SiraDex e instalar las librerias con

    $ sudo pip install -r requirements.txt.sls

3. BASE DE DATOS
################################################################################

Instalar PostgreSQL desde el terminal.

    $ sudo apt-get install postgresql postgresql-client

Iniciar sesion como usuario postgres y crear la base de datos Siradex

    $ sudo -su postgres
    $ createdb NombreBaseDatos

Crear el usuario Siradex y garantizar el acceso a la base de datos.

    $ psql
    $ CREATE USER "Usuario" WITH PASSWORD 'Password';
    $ GRANT ALL PRIVILEGES ON DATABASE "NombreBaseDatos" to "Usuario";

Salir y entrar en la base de datos NombreBaseDatos como usuario Usuario

    $ \q
    $ psql -d NombreBaseDatos -U Usuario (recordar que el password es: Password)

    ###########################################################
    NOTA IMPORTANTE:
    Si este paso da error de Autenticacion con PEER,
    leer el punto de Errores al final de estas instrucciones
    antes de continuar.
    ###########################################################

4. EJECUCION
################################################################################

Ir al directorio de la aplicación y ejecutar:

    $ python manage.py runserver

Si no hay errores, el sistema empezara a correr en:

    http://127.0.0.1:8000/

5. ERRORES FRECUENTES
################################################################################

ERROR:

  FATAL: Peer authentication failed for user "NombreBaseDatos"

SOL:
  a. Crear password para postgres:

        $ sudo -su postgres
        $ psql (EN ESTE PASO TOMAR NOTA DE LA VERSION DE POSTGRES, Ej. 9.3)
        $ ALTER USER postgres WITH PASSWORD 'newpassword';

  b. Salir de postgres y editar el archivo 'pg_hba.conf'

        $ sudo gedit /etc/postgresql/X.X/main/pg_hba.conf
          (Donde X.X e la version de postres, Ej. 9.3)

     cambiar en el archivo las siguientes lineas:

       local    all   postgres    peer
       local    all   all         peer

     por:

       local    all   postgres    md5
       local    all   all         md5

      y guardar el archivo.

   c. Reiniciar Postgres.

        $ sudo service postgresql restart

################################################################################
