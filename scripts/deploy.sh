set -xe
cd ..
npm run build
rm -rf temp_deploy
mkdir temp_deploy
cp -r dist temp_deploy/html_paygate
cd temp_deploy
	tar -cvzf html_paygate.tar.gz html_paygate
sftp -b - root@usrv <<EOF
cd /var/www
put html_paygate.tar.gz
bye
EOF
ssh root@usrv  'rm -rf /var/www/html_paygate'
ssh root@usrv  'cd /var/www && tar xvf html_paygate.tar.gz &&  rm html_paygate.tar.gz'
ssh root@usrv  'chown -R www-data:www-data /var/www/html_paygate'
cd ..
rm -rf temp_deploy
