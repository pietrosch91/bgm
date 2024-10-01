npm install express
npm install express-session
npm install mysql2

sudo mysql -e "CREATE USER IF NOT EXISTS 'fi-gioca-admin'@'localhost' IDENTIFIED BY 'fi-gioca-admin'"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS bgm2"
sudo mysql -e "GRANT ALL ON bgm2.* TO 'fi-gioca-admin'@'localhost'"
sudo mysql -e "DELETE FROM mysql.proc WHERE db = 'bgm2'"

sudo cp systemd/bgm.service /etc/systemd/system/bgm.service
sudo systemctl enable bgm.service
