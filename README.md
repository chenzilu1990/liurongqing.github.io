---
---

## 博客地址

[https://www.liurongqing.com](https://www.liurongqing.com)

{% for post in site.posts %}
<section class="post">
    <div class="title">
        <h2>
            <a href="{{ post.url }}">{{ post.title }}</a>
        </h2>
        <p>
            Posted on
            <a href="javascript:;">{{post.date | date: "%Y-%m-%d"}}</a> | By
            <a href="/tag/{{post.tags}}">{{post.tags}}</a>
        </p>
    </div>
    <div class="description">
        <p>
            {{post.excerpt | remove: '<p>' | remove: '</p>'}}
        </p>
    </div>
</section>
{% endfor %}
