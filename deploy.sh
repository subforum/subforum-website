#!/usr/bin/env bash

commit=$1
script_dir="$(dirname "$0")"



source "${script_dir}/deploy-config.sh"

setup_code
replace_code
# restart_server