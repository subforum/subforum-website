from deployer.utils import esc1
from deployer.host import SSHHost

supervisor_config = \
"""
[program:djangoproject]
command = /home/username/.virtualenvs/project-env/bin/gunicorn_start  ; Command to start app
user = username                                                       ; User to run as
stdout_logfile = /home/username/logs/gunicorn_supervisor.log          ; Where to write log messages
redirect_stderr = true                                                ; Save stderr in the same log
"""

django_settings = \
"""
DATABASES['default'] = ...
SESSION_ENGINE = ...
DEFAULT_FILE_STORAGE = ...
"""

class VirtualEnv(Node):
    location = required_property()
    requirements_files = []
    packages = []

    # Command to execute to work on the virtualenv
    @property
    def activate_cmd(self):
        return  '. %s/bin/activate' % self.location

    def install_requirements(self):
        """
        Script to install the requirements of our Django application.
        (We have a requirements.txt file in our repository.)
        """
        with self.host.prefix(self.activate_cmd):
            for f in self.requirements_files:
                self.host.run("pip install -r '%s' " % esc1(f))

    def install_package(self, name):
        """
        Utility for installing packages through ``pip install`` inside
        the env.
        """
        with self.host.prefix(self.activate_cmd):
            self.host.run("pip install '%s'" % name)

    def setup_env(self):
        """ Install everything inside the virtualenv """
        # From `self.packages`
        for p in self.packages:
            self.install_package(p)

        # From requirements.txt files
        self.install_requirements()

class Git(Node):
    project_directory = required_property()
    repository = required_property()

    def install(self):
        """ Installs the ``git`` package. """
        self.host.sudo('apt-get install git')

    def clone(self):
        """ Clone repository."""
        with self.host.cd(self.project_directory, expand=True):
            self.host.run("git clone '%s'" % esc1(self.repository))

    def checkout(self, commit):
        """ Checkout specific commit (after cloning)."""
        with self.host.cd('~/projects/subforum-django', expand=True):
            self.host.run("git checkout '%s'" % esc1(commit))

class DjangoDeployment(Node):
    class virtual_env(VirtualEnv):
        location = '~/.virtualenvs/project-env/'
        packages = [ 'gunicorn', 'supervisor' ]
        requirements_files = ['~/git/django-project/requirements.txt' ]

    class git(Git):
        project_directory = '~/git/django-project'
        repository = 'git@github.com:example/example.git'

    def setup(self):
        # Clone repository
        self.git.clone()

        # Install virtual packages
        self.virtual_env.setup_env()

    def upload_django_settings(self):
        """ Upload the content of the variable 'local_settings' in the
        local_settings.py file. """
        with self.host.open('~/git/django-project/local_settings.py') as f:
            f.write(django_settings)

    def run_management_command(self, command):
        """ Run Django management command in virtualenv. """
        # Activate the virtualenv.
        with self.host.prefix(self.activate_cmd):
            # Cd to the place where we have our 'manage.py' file.
            with self.host.cd('~/git/django-project/'):
                self.host.run('./manage.py %s' % command)

    def django_shell(self):
        """ Open interactive Django shell. """
        self.run_management_command('shell')

    def run_gunicorn(self):
        """ Run the gunicorn server """
        self.run_management_command('run_gunicorn')

    def upload_supervisor_config(self):
        """ Upload the content of the variable 'supervisor_config' in the
        supervisord configuration file. """
        with self.host.open('/etc/supervisor/conf.d/django-project.conf') as f:
            f.write(supervisor_config)