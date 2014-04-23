#!/usr/bin/env bash

cd $2/src/main/ec2scripts

#!/bin/bash
export EC2_HOME=/var/lib/jenkins/ec2-api-tools-1.6.12.0
export AWS_ELB_HOME=/var/lib/jenkins/ElasticLoadBalancing-1.0.34.0
export PATH=$PATH:$EC2_HOME/bin:$AWS_ELB_HOME/bin

#export JAVA_HOME=/usr

export AWS_ACCESS_KEY=$1
export AWS_SECRET_KEY=$2
export EC2_PRIVATE_KEY=$3

amiid=ami-c3200caa
region=us-east-1
instancecount=1
key=dino_telecom
group=sg-f235d09b
lbId="Demo2"
tagname="Demo Telecom"

ec2_instance_type="t1.micro"

echo "EC2_INSTANCE_TYPE: $ec2_instance_type"

##############

## build userdatafile
userdatafile="initawsParametrized.sh"
cp initaws_header.sh $userdatafile
echo "export APPLICATION_WAR='$applicationWarName'" >> $userdatafile
echo "puppet apply -v -e 'include startup'" >> $userdatafile
chmod +x $userdatafile

cat $userdatafile
echo "... STARTING to build EC2 instance..."
echo

rm *out

echo "describe existing Elastic Load Balancers for region $region"
elb-describe-lbs --region $region > LOAD_B_DESC.out
cat LOAD_B_DESC.out

echo "launch new EC2 instance from AMI-ID ($amiid) with user data file: $userdatafile"
ec2-run-instances --instance-count $instancecount --key=$key --instance-type=$ec2_instance_type --user-data-file=$userdatafile --group=$group --region=$region $amiid > NEW_INSTANCE.out

instanceId=`./getInstanceId.pl NEW_INSTANCE.out`
echo "created new EC2 instance: $instanceId"
cat NEW_INSTANCE.out

#echo "add TAGs to instance: $tagname"
#ec2-create-tags $instanceId --tag="Name=$tagname" --region=$region > EC2_TAGS.out
#cat EC2_TAGS.out

echo "add instance $instanceId to elastic load balancer (after 5 minutes)"
sleep 300

for i in {1..5}
do
   elb-register-instances-with-lb $lbId --instances $instanceId --region=$region > ELB_REG_INST.out
   OUT=$?
   cat ELB_REG_INST.out

   if [ $OUT -eq 0 ];then
      echo "add to Elastic Load Balancer!"
      break
   else
      echo "retry... (10 sec.)"
      sleep 10
   fi
done

echo "wait few minutes to see work the application"
rm -f $userdatafile
echo "Done."
