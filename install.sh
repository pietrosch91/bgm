sudo mysql -e "CREATE USER IF NOT EXISTS 'fi-gioca-admin'@'localhost' IDENTIFIED BY 'fi-gioca-admin'"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS bgm2"
sudo mysql -e "GRANT ALL ON bgm2.* TO 'fi-gioca-admin'@'localhost'"
sudo mysql -e "DELETE FROM mysql.procs WHERE db = 'bgm2'"
