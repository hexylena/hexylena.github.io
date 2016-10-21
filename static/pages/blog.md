---
layout: page
title: Blog Posts
description: Blog Posts
keywords: Rasche, devops, administration, bioinformatics, galaxy
---

<ul>
    {% for post in site.posts %}
    <li>
        <a href="{{ post.url  }}">{{ post.title  }}</a>
        {{ post.excerpt  }}
    </li>
    {% endfor %}
</ul>

