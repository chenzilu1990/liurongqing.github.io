准备工作
# 安装 git
yum install -y git

# 创建数据库 gogs
mysql -u root -p # 回车输入密码
create database gogs

# 创建用户并设置密码
useradd git
passwd git # 回车输入密码

# 给git sudo的权限，sudo的时候输入该 git 用户密码
vim /etc/sudoers
找到 root ALL=(ALL) ALL 在下面加一行
git ALL=(ALL) ALL
:wq!

# 进入 git 用户
su git
二进制安装
cd /www
sudo wget http://7d9nal.com2.z0.glb.qiniucdn.com/0.11.34/linux_amd64.tar.gz
解压运行
sudo tar xzf linux_amd64.tar.gz
cd gogs && ./gogs web
IP 访问
# 访问，自动跳转到安装界面
http://ip:3000

# 配置
1. 数据库名称要跟上面创建的数据库名称对应，或者再创建一个数据库
2. 数据库密码就是安装 mariadb 时设置的密码
3. 仓库根目录 /www/gogs-repositories
4. 域名 gogs.xxx.com
5. 应用 URL http://gogs.xxx.com
6. 管理员帐号设置
配置 Nginx
vim /etc/nginx/conf.d/gogs.xxxxx.com.conf
server {
  listen 80;
  server_name gogs.xxxxx.com; # 域名要在阿里云后台解析指向到本服务器IP
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_pass http://127.0.0.1:3000;
  }
}

# 重启(每次修改配置记得重启)
systemctl restart nginx.service
修改配置文件
vim /gogs/custom/conf/app.ini
# 将一些 `localhsot` `127.0.0.1` 改成你自己的域名
让 gogs 服务在后台执行
方法一（推荐）
# 进入gogs/scripts/文件夹下有关于多个系统的服务脚本
cd /www/gogs/scripts/

# 复制 init/centos/gogs 命令到 /etc/init.d/ 目录下
sudo cp init/centos/gogs /etc/init.d/

# 给 /etc/init.d/gogs 添加执行权限
sudo chmod +x /etc/init.d/gogs

# 更改 gogs 脚本内的GOGS_HOME目录位置的设置
sudo vim /etc/init.d/gogs
GOGS_HOME=/www/gogs

# 运行
/etc/init.d/gogs start
sudo systemctl restart gogs.service
方法二
su git
nohup ./gogs web &

# 重启
ps -aux | grep gogs # 查看端口号
kill -9 端口号
nohup ./gogs web &
运行、停止、重启、状态
sudo systemctl start gogs.service
sudo systemctl stop gogs.service
sudo systemctl restart gogs.service
sudo systemctl status gogs.service
开机启动
sudo /sbin/chkconfig gogs on
通过 ssh 操作 git 库
将上面的 `ssh 登录服务器` 生成的公钥添加到 gogs 中，本地就可以克隆 gogs上的代码
右上角 -> 用户设置 -> SSH 密钥 -> 添加密钥
git clone git@gogs.xx.com:xx/notes.git
升级 gogs
把当前的 gogs 重命名名 gogs_old
cp -R gogs_old/custom gogs
下载新的 gogs 包并解压到当前目录下
cp -R gogs_old/data gogs
把 gogs_old 中的 custom data log 目录复制覆盖到新的包中
cp -R gogs_old/log gogs