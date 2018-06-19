检出仓库
git clone username@host:/path/repository

# 指定分支
git clone -b 分支名 库地址 
工作流
本地仓库由 git 维护的三棵“树”组成。
https://sqa-res.oss-cn-beijing.aliyuncs.com/blog/images/trees.png
第一个是工作目录
第二个是缓存区（Index）[通过 git add . 添加到缓存区中]
第三个是 HEAD（指向最近一次提交后的结果） [通过 git commit 提交]
图片参考

添加提交及推送改动
# 添加指定文件或目录
git add <filename>

# 添加所有
git add all

# 添加当前所有
git add .

# 提交到 HEAD
git commit -m '代码提交信息'

# 更新拉取远程仓库
git pull

# 更新拉取远程仓库并自动合并
git pull --rebase

# 提交到远程仓库 （每次 git push 之前，先执行 git pull）
git push 

# 远程还没有仓库时，将本地仓库连接并推送上去
git remote add origin <server> 
分支与合并
# 创建分支，并切换过去
git checkout -b feature_a

# 切换到 master 分支
git checkout master

# 删除分支
git branch -d feature_a

# 推送分支到远端仓库
git push --set-upstream origin branch

# 查看所有分支
git branch -a

# 合并其他分支到你当前分支（例如 option1）
git merge option1

# 查看两分支改动处
git diff <source_branch> <target_branch>

# 查看当前文件与 HEAD 中的不同处
git diff -- 目录或文件名
撤销修改
新创建文件或目录还没有执行过 git add
此类文件状态为 Untracked files 撤销方法如下

git clean -df .  
提交过版本库，未提交到暂存区 （执行过git commit，但又修改了，还没有git add）
此类文件状态为 Changes not staged for commit 撤销方法如下

git checkout . 
已提交到暂存区的文件 （执行过git add）
此类文件状态为 Changes to be committed 撤销方法如下

git reset . 
执行以后回到 1 或 2 状态，可按以上步骤再执行撤销
若要放弃本地修改全部撤销，方法如下

# 放弃工作目录中修改，还原成版本库的版本
git reset --hard

# 放弃工作目录中修改，还原到服务器上最新版本 [慎用，还原以后本地修改不知道咋找回了]
git reset --hard origin/master
已提交版本库 （执行过git commit）
每次提交会产生一个 hash 版本号，可通过查看版本号将其回滚

git log  
git reset <版本号>

# 回滚到上一次提交
git reset head~1

# 恢复以后强制覆盖线上
git push -f
冲突解决
一般出现在二个分支合并或是 git pull时会遇到冲突，同时修改的文件会进入 Unmerged 状态
解决冲突的方法是 使用当前 HEAD 的版本（ours）或 使用合并进来的分支版本（theirs）

# 使用当前分支 HEAD 版本，通常是冲突源文件的 <<<<<<< 标记部分，======= 的上方
git checkout --ours <文件名>

# 使用合并分支版本，通常是源冲突文件的 >>>>>>> 标记部分
git checkout --theirs <文件名>

# 标记为解决状态加入暂存区
git add <文件名>

# 如果使用 git pull --rebase遇到冲突时，按上面方法全部解决完以后执行
git rebase --continue

# 所有冲突解决以后再执行
git push
快捷命令
安装过oh-my-zsh可使用这些快捷命令
获取全部命令
https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git