## TODO

- [x] 首页home列表、标签页tag列表、详情page页 标签无法跳转
- [x] 永久链接  permalink
- [x] 日期格式优化
- [x] excerpt_separator 查看更多 修改
- [x] 自动生成 mapsite.xml
- [x] rouge 编辑主题选择
- [x] 添加评论功能
- [x] 首页与详情页logo有闪动
- [x] 内容侧边显示标题
- [x] 头部浏览进度条
- [x] 上一页、下一页
- [x] 分页功能 或 标题列表与块切换形式


## 编写技巧

1. 遍历一个对象值

    ```shell
    {% for i in page.previous %}
        {{i}}
    {% endfor %}
    ```