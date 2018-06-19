https://docs.ghost.org

安装条件
Ubuntu 16.04(CentOS也可以)
MySQL
NGINX(>=1.9.5 SSL)
node (6.9<= 版本 <7.*)
至少 1G 内存
一个非 root 用户(例如：blog，不可以叫 ghost)
创建用户并配置用户信息
useradd blog
passwd blog # 回车输入密码

# 给git sudo的权限，sudo的时候输入该 git 用户密码
vim /etc/sudoers
找到 root ALL=(ALL) ALL 在下面加一行
blog ALL=(ALL) ALL
:wq!

su blog
安装 ghost-cli
# 安装
sudo npm i -g ghost-cli

# 创建新文件夹
sudo mkdir -p /www/ghost

# 添加权限
sudo chown blog:blog /www/ghost
安装 ghost
默认使用 MySQL 数据库

cd /www/ghost
ghost install
安装过程中配置
? Enter your blog URL: http://www.xxx.com
? Enter your MySQL hostname: localhost
? Enter your MySQL username: root
? Enter your MySQL password: [hidden]
? Enter your Ghost database name: ghost_prod
? Password [input is hidden]：(root权限，blog密码)
? Do you wish to set up Nginx? (Y/n) n
? Do you wish to set up "ghost" mysql user?(Y/n) Y
? Do you wish to set up Systemd? (Y/n) Y
? Do you want to start Ghost? (Y/n) Y
服务管理
# 启动
systemctl start ghost_www-xxx-com

# 停止
systemctl stop ghost_www-xxx-com

# 重启
systemctl restart ghost_www-xxx-com

# 查看状态
systemctl status ghost_www-xxx-com
配置 nginx
vim /etc/nginx/conf.d/www.xx.com.conf

server {
    listen 80;
    server_name www.xxx.com;
    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:2368;
    }
}

# 如果不带 www 则跳转到 www.xxx.com
server {
    listen 80;
    server_name xxx.com;
    return 301 http://www.xxx.com$request_uri;
    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:2368;
    }
}

# 重启 nginx, 修改配置文件要记得重启
systemctl restart nginx.service
运行
# 登录前台
http://www.xxx.com

# 登录后台
http://www.xxx.com/ghost
下载客户端
下载

卸载与更新
ghost uninstall
ghost update