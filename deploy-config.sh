#!/usr/bin/env bash

SRC_DIR=~/subforum-website
BASE_DIR=/var/www/content.subforum.org
DEST_DIR=${BASE_DIR}/code
STATIC_DIR=${BASE_DIR}/static/
UI_BUILD_DIR=${SRC_DIR}/subforum/ui
BRANCH=${BRANCH="development"}

NGINX_CONFIG='production'
SUPERVISOR_CONF='supervisor-production.conf'
DJANGO_SETTINGS_MODULE='subforum.settings'


function setup_code() {
    commit=$1

    if [ ! -d "${SRC_DIR}" ]; then
        git clone https://github.com/subforum/subforum-website.git
        cd ${SRC_DIR}
        git checkout ${BRANCH}
    else
        cd ${SRC_DIR}
        git checkout ${BRANCH}
        git pull
    fi

    if [ -n "$commit" ]; then
        git checkout ${commit}
    fi

    cd ${UI_BUILD_DIR}
    npm install
    brunch build
    cd ~/
}


# function stop_server() {
#     sudo supervisorctl stop all
# }

function replace_code() {
    sudo rm -rf ${DEST_DIR}
    sudo cp -R ${SRC_DIR}/ ${DEST_DIR}
    sudo rm -rf  ${DEST_DIR}/.git || exit 1
}

# function restart_server() {
#     # Restart nginx
#     sudo cp -f ${DEST_DIR}/deploy/config/${NGINX_CONFIG}.nginx.conf /etc/nginx/sites-available/
#     sudo ln -sf /etc/nginx/sites-available/${NGINX_CONFIG}.nginx.conf /etc/nginx/sites-enabled/${NGINX_CONFIG}.nginx.conf
#     sudo service nginx reload

#     # Restart supervisor
#     sudo cp ${DEST_DIR}/deploy/config/${SUPERVISOR_CONF} /etc/supervisor/conf.d/
#     sudo supervisorctl update
#     sudo supervisorctl restart all
# }