#!/usr/bin/env bash

iptables -I INPUT -p tcp -m tcp --dport 8080 -j ACCEPT