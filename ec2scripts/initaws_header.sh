#!/bin/bash
set -e -x
export DEBIAN_FRONTEND=noninteractive
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
su - ubuntu -c "cd /home/ubuntu;mkdir Applications;cd Applications;git clone ssh://git@github.com:mondora/website.git"
cd /home/ubuntu/Applications/cd-demo/src/main/puppet/installmodules
./install-modules.sh
export APPLICATION_WAR=cd-demo.war