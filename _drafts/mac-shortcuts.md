系统级别
快捷键	功能
cmd + w	关闭窗口
cmd + q	退出当前程序
cmd + m	最小化窗口
cmd + +	放大内容
cmd + -	缩小内容
cmd + shift + A	进入应用目录
cmd + shift + G	输入路径进入目录
cmd + ctrl + W	打开微信窗口
cmd + ctrl + Z	打开qq窗口
cmd + ctrl + F	全屏
option + 右击dock图标	强制关掉应用
cmd + del	放入垃圾桶中
cmd + shift + del	清空垃圾桶
回车	重命名文件
cmd + option + esc	强制退出指定应用程序
Terminal
快捷键	功能
ls al	查看所有文件信息
cd ~ | / | ../	进入用户根目录 | 系统根目录 | 上一级目录
pwd	查看当前路径
touch 1.txt	创建文件
mkdir d	创建目录
vim x.txt	编辑文件
history	查看使用过的命令
rm -rf 1.txt	强制删除文件
chmod 777 1.txt	给 1.txt 加权限
chown user:group 1.txt	修改 1.txt 的拥有者与所属组
code .	打开当前目录到 VSCode 中
open .	打开当前目录在文件系统中查看
ssh root@ip	进入远程服务器
scp /www/1.txt root@ip:/home/	本地copy到远程
scp root@ip:/home/1.txt /www/	远程copy到本地
浏览器
快捷键	功能
cmd + R	刷新页面
cmd + option + J	打开调试控制台
cmd + 数字	进入对应选项卡
cmd + W	关闭选项卡
cmd + shift + T	恢复关闭的选项卡
cmd + L	进入地址栏
cmd + T	新开选项卡
cmd + N	新开页面
cmd + D	加入收藏
cmd + shift + N	隐身模式新开页面
cmd + 左击链接	新开选项卡打开
shift + 左击链接	新开窗口打开
cmd + 0	恢复浏览器 100% 大小
cmd + option + U	查看网页源码
cmd + option + B	收藏夹
VSCode 编辑器
快捷键	功能
cmd + P	查找文件
cmd + B	开关菜单
cmd + W	关闭页签
cmd + F	当前文件搜索
cmd + option + F	当前文件内容替换
cmd + shift + F	全局搜索
shift + option + 方向上	向上copy一行
shift + option + 方向下	向下copy一行
option + 方向上	向上移动一行
option + 方向下	向下移动一行
cmd + X	剪切一行
ctrl + G	跳转行
cmd + /	注释一行
cmd + D	添加下一个匹配项
option + Z	内容是否自动换行
Git 常用命令
快捷键	功能
gaa=git add ||all	添加至缓存
gcmsg=git commit |m	提交本地 head 中
gl=git pull	远程拉下来
gp=git push	提交到远程仓库中
gst=git status	查看状态
gco=git checkout	检出
gba=git branch |a	查看所有分支
gd=git diff	查看差异
glg=git log ||stat	查看日志
gsta=git stash save	暂时保存到 stash 中
gstp=git stash pop	将 stash 最后一个打出来
gclean=git clean |fd	未提交版本库撤消
Vim 常用命令
快捷键	功能
esc	按esc进入命令模式
a | i | o	进入编辑模式
h l k j	左右上下移动光标
gg	跳转到第1行
dd	删除 1 行
2dd	从当前行开始删除 2 行
yy	复制 1 行
p	粘贴
u	撤消
G跳转到最后一行	
:100	跳转到第 100 行
:wq	保存退出
/text	查找 text
:set nu	显示行号
%s/old/new/g	全局将old替换成new