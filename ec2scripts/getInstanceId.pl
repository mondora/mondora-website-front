#!/usr/bin/perl
#
# get EC2 instance ID
# by Marco Rozzati
#
# ./getInstanceId.pl <filename> >

# RESERVATION	r-0752984d	096790086106
# INSTANCE	i-a0e976ed	ami-d5d8c8a1		ip-172-31-23-60.eu-west-1.compute.internal	pending	matutoraws	0		t1.micro	2013-06-05T14:45:10+0000	eu-west-1a	aki-71665e05			monitoring-disabled		172.31.23.60	vpc-56978f3e	subnet-29978f41	ebs					paravirtual	xen		sg-5a866635	default	false
# NIC	eni-46f31e2d	subnet-29978f41	vpc-56978f3e	096790086106	in-use	172.31.23.60	ip-172-31-23-60.eu-west-1.compute.internal	true
# NICATTACHMENT	eni-attach-e955b381	0	attaching	2013-06-05T16:45:10+0100	true
# GROUP	sg-5a866635	matutor-bis
# PRIVATEIPADDRESS	172.31.23.60	ip-172-31-23-60.eu-west-1.compute.internal


$infile = shift;
open(INPUT, "$infile") || die $!;

$out = "";
$x = "";
$cont = 1;

while (<INPUT>) {
  chomp;
  $row = $_;
  if ($row =~ m/^INSTANCE\t(i-[0-9a-f]+)/m) {
    $result = $1;
    print $1;
    break;
  }
}

close(INPUT);

