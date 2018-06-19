准备工作
安装 brew
http://brew.sh

# 常用命令
brew update 更新
brew upgrade [name] 升级，没有指定name，则升级全部
brew info 安装包信息查看
brew search 安装包搜索
brew list 安装包列表
brew install [name] 安装
brew uninstall [name] 卸载

# 路径
/usr/local/etc/ 配置文件
/usr/local/Cellar/ 安装目录
查看系统自带 Apache 与 PHP 版本
httpd -v  
php --version
关闭系统自带 Apache 与 PHP
sudo apachectl stop  
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist

# 当前系统不版本不支持删除，不过没关系，后面我们会替换php版本
sudo rm -rf /usr/bin/php
Nginx 的安装与配置
安装 nginx
brew install nginx 
修改配置文件
sudo vim /usr/loca/etc/nginx/nginx.conf

# 更改端口与root路径
server {  
  listen 80;
  root /www/;
  server_name localhost;
  index index.html index.php
}

# 上面设置root无效的话，删除以下这个配置,或者在这个下配置root与index
{
  location / {
    root html;
    index index.html;
  }
}
给予管理员权限
sudo chown root:wheel /usr/local/opt/nginx/bin/nginx
sudo chmod u+s /usr/local/opt/nginx/bin/nginx
开机启动
mkdir -p ~/Library/LaunchAgents
cp /usr/local/opt/nginx/homebrew.mxcl.nginx.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
运行 nginx
sudo nginx # 启动nginx
nginx -t # 测试配置是否有错误

# 重新加载配置|重启|停止|退出
nginx -s reload|reopen|stop|quit

# 打开浏览器，正常的话，能指向到配置文件中的root指向的目录了
http://localhost/

# sudo nginx时可能会报以下警告，这是因为nginx重复绑定server name
nginx: [warn] conflicting server name "localhost" on 0.0.0.0:80, ignored
常用命令
# 显示版本信息
nginx -v

# 显示版本和配置信息
nginx -V

# 检测配置文件是否有错误
nginx -t

# 给nginx主进程发送信息 【reload:重新加载配置文件 reopen:重启 stop: 停止 quit: 退出】
nginx -s [reload|reopen|stop|quit] 

# 默认是：/usr/local/etc/nginx/nginx.conf
nginx -c 设置配置文件
PHP 5.6 的安装与配置
brew 默认没有 php 的安装包
brew tap home-brew/dupes  
brew tap homebrew/php
安装 php
brew install php56
将 php 路径覆盖系统的 php
# 在系统的~/.zshrc或~/.bash_profile中添加
export PATH="$(brew --prefix homebrew/php/php56)/bin:$PATH"

# 执行
source ~/.zshrc  
source ~/.bash_profile
开机自启动
mkdir -p ~/Library/LaunchAgents  
cp /usr/local/opt/php56/homebrew.mxcl.php56.plist ~/Library/LaunchAgents/  
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php56.plist
配置Nginx支付PHP-FPM
sudo vim /usr/local/etc/nginx/nginx.conf  
location ~ \.php$ {  
    fastcgi_pass  127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include  fastcgi_params;
}
测试 php5.6
# 在配置文件中设置的root目录下创建个index.php
<?php  
phpino();

# 访问 http://localhost/index.php
MySQL 5.6 的安装与配置
安装 mysql
brew install homebrew/versions/mysql56
配置文件
cd /usr/local/opt/mysql

# 删除配置文件，一会初始化时，会生成一个新的
rm my.cnf 
开机自启动
mkdir -p ~/Library/LaunchAgents/  
cp /usr/local/opt/mysql56/homebrew.mxcl.mysql56.plist ~/Library/LaunchAgents/  
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql56.plist
初始化 mysql，设置 root 密码，连接 mysql
# 初始化
cd /usr/local/opt/mysql  
./bin/mysql_install_db

# 设置root密码
./bin/mysql_secure_installation

# 命令行连接mysql
mysql -u root -p 回车