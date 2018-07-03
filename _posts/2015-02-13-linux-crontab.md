---
title: Linux 简单的计划任务
tags: linux
keywords: crontab, linux
---

:cow: linux 下 crontab 介绍使用及二个例子展示。
<!--more-->

## 做以下 2 个例子
1. 例子一： 每 3 天的凌晨 3 点，执行一个 php 文件
2. 例子二： 每 2 天的凌晨 2 点，备份数据库

## crontab 说明
\* \* \* \* \*  command

```shell
分 时 天 月 周 命令

第 1 列表示分钟 1～59 每分钟用 * 或者 */1 表示
第 2 列表示小时 1～23（0 表示 0 点）
第 3 列表示日期 1～31
第 4 列表示月份 1～12
第 5 列标识号星期 0～6（0 表示星期天）
第 6 列要运行的命令
```

## 常用 `crontab` 命令
```shell
crontab -l # 查看当前用户计划任务  
crontab -e # 编辑当前用户计划任务  
crontab -d # 删除当前用户计划任务
```

## 例子一： 每 3 天的凌晨 3 点，执行一个 php 文件
> /usr/local/php/bin/php是php的bin路径，可以用which php来查询 <br>
> /home/www/getData.php是要执行的php的绝对路径

```shell
crontab -e  
00 03 */3 * * /usr/local/php/bin/php /home/www/getData.php  
```

## 例子二： 每 2 天的凌晨 2 点，备份数据库
> /bin/sh是sh的bin路径，可以用which sh来查询 <br>
> /home/www/backupSql.sh是要执行的sh脚本的绝对路径

```shell
crontab -e  
00 02 */2 * * /bin/sh /home/www/backupSql.sh
```

## backupSql.sh 的内容
```shell
#/bin/bash
mysql_host="localhost";  
mysql_user="root";  
mysql_passwd="admin";  
backupDate=`date -d "now" +%Y%m%d_%H%M%S`;  
backup_dir="/home/backup/db";  
/usr/local/mysql/bin/mysqldump -h$mysql_host -u$mysql_user -p$mysql_passwd demo > $backup_dir/demo_$backupDate.sql
```