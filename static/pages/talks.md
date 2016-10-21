---
layout: page
title: Talks
description: Eric Rasche's Talks
---

<table class="table table-striped">
    <thead>
        <tr>
            <th>Title</th>
            <th>Links</th>
            <th>Meeting</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        {% for talk in site.data.talks %}
        <tr>
            <td>
                <a href="{{ talk.meeting_url }}">
                    {{ talk.meeting_name }}
                </a>
            </td>
            <td>
                {{ talk.title }}
            </td>
            <td>
                <a href="{{ talk.pdf_url }}">
                    <img src="icons16/pdf-icon.png">
                </a>
                <a href="{{ talk.data_url }}">
                    <img src="icons16/github-icon.png">
                </a>
            </td>
            <td>{{ talk.date }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>
