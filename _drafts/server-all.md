本文主要内容是：SSH 登录服务器、yum 源管理、nginx、node、mariadb、gogs、ghost 的安装与使用。

安装系统 CentOS 7.4
登录阿里云控制台
进入菜单云服务器 ECS -> 实例 -> 管理 -> 更换系统盘 -> CentOS 7.4 64 位
设置 root 密码
ssh 免密码登录服务器
本地生成公钥与私钥
ssh-keygen -t rsa # 回车, 填写私钥名称, 如 ~/.ssh/test, 然后一直回车
添加私钥到高速缓存中
ssh-add ~/.ssh/test
将生成的公钥添加到服务器的 authorized_keys 文件中
# 公钥是 ~/.ssh/test.pub
vim /root/.ssh/authorized_keys
修改本地 ssh 配置
vim ~/.ssh/config  
host test  
    user root
    hostname IP地址
    identityfile ~/.ssh/test # 你生成的私钥
本地登录服务器
ssh test
yum 源管理
系统包更新到最新版本
yum -y update # 保留旧版本的 package
yum -y upgrade # 删除旧版本的 package
添加个 MariaDB.repo 安装 10.2 版本的 mariadb
https://downloads.mariadb.org/mariadb/repositories

# 编辑文件
vim /etc/yum.repos.d/MariaDB.repo

# 国内源（推荐）
[mariadb]
name = MariaDB
baseurl = https://mirrors.ustc.edu.cn/mariadb/yum/10.2/centos7-amd64
gpgkey=https://mirrors.ustc.edu.cn/mariadb/yum/RPM-GPG-KEY-MariaDB
gpgcheck=1

# 官方源
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.2/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1

# 添加读权限
chmod 444 /etc/yum.repos.d/MariaDB.repo
nginx 安装与使用
安装
yum install -y nginx
启动
systemctl start nginx.service
开机启动
systemctl enable nginx.service
配置域名
cd /etc/nginx/conf.d
vim /etc/nginx/conf.d/www.xxx.com.conf
server {
  listen 80;
  server_name www.xxx.com; # 域名要在阿里云后台解析指向到本服务器IP
  root /www/; # 根目录 www 没有则创建
}

# 配置完以后重启 Nginx
systemctl restart nginx.service
node 安装与使用
https://nodejs.org/en/download/package-manager
ghost 建议使用 6.9 <= 版本 < 7.*

# 设置安装
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
yum install -y nodejs 

# 查看安装版本
node -v
mariadb 安装与使用
安装
yum install MariaDB-server MariaDB-client
启动
systemctl start mariadb.service
开机启动
systemctl enable mariadb.service
初始化
mysql_secure_installation
1. Enter current password for root (enter for none): enter
2. Set root password? [Y/n]? Y 输入你要设置的密码
3. Remove anonymous users? Y 移除匿名用户
4. Disallow root login remotely? Y 不允许远程 root 登录
5. Remove test database and access to it? Y 删除 test 库
6. Reload privilege tables now? Y 重新加载授权信息
gogs 安装与使用
详细操作链接

ghost 安装与使用
详细操作链接