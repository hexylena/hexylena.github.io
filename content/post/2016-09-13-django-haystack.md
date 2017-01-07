---
date: 2016-09-13T00:00:00Z
description: Quick tutorial on using Django + Haystack + Whoosh
tags:
- dev
- django
- tutorials
title: Django + Haystack
---

There is a dearth of good tutorials on Django and Haystack's usage together (at least recent/updated ones). So here's one more! Pull requests are quite welcome on this blog post; I would love for it to stay up to date.

I will try not to make assumptions about you, the reader's, technical skills. If you find that I do, please feel free to [edit](https://github.com/erasche/erasche.github.io/blob/master/_posts/2016-09-13-django-haystack.md) the post and submit your corrections, or file an issue on the repository, and I will fix them when I find time.

# Background

If you've stumbled here by accident:

- **Django** is an easy to use framework for building websites (and a whole bunch of other things!)
- **Haystack** is a really intense module for adding search to Django sites
- **Whoosh** is a search backend. Haystack itself doesn't actually handle search, rather it hands it off to one of several backends. Whoosh is special because it's written purely in python and doesn't require that you manage another server running in the background to index your documents, which is really beginner un-friendly.

Haystack, by having all of these search backends, allows you to start simple with something like Whoosh, and then as your data grows and your needs grow, you can scale up to using one of the other search backends that might be faster/able to handle more data.

So let's build something with Django and Haystack. How about a search engine for our documents? If you're in academia like me, you probably have a hundred random PDF files scattered across your computer, maybe you need a way to index those and search on them.

# Setup

You should have python installed (run `python --version` at the command line, you should see something like `Python 2.7...`), and possibly [`virtualenv`](https://virtualenv.pypa.io/en/stable/) installed if you wish to keep your dependencies clean (though it is completely optional).

This tutorial assumes you are on Linux or OSX, as we'll be running a few commands on the command line.

## Creating a Workspace

First things first! We need to make a folder for our new project which we'll be calling `Paper-Search`:

```console
# TODO: come up with a better name ;)
[hxr@leda:~/]$ mkdir paper-search # Create a directory for the project. You might not want to create yours in your home directory, but instead wherever you keep your programming projects
[hxr@leda:~/]$ cd paper-search # change into that directory once you've created it
[hxr@leda:~/paper-search]$
```

## Project Setup

### Virtualenv

We'll use virtualenv in order to keep our dependencies separate. This step is completely optional, but if you skip it you will need to keep a couple things in mind:

1. You may need `sudo` when you run `pip install` (There's also a `--user` flag but I haven't quite figured that one out yet)
2. All of the terminal blocks you see will have a `(.venv)` bit in them. That is caused by the virtualenv so you should just ignore that.

Back to virtual environments. I like to create mine in `.venv` so I don't see them when I `ls`, and because the git ignore file I use has that on the list of ignored things already. You don't want to add your virtualenv to git because it contains a lot of stuff that can be easily re-downloaded and will clutter your git histories.

```console
[hxr@leda:~/paper-search]$ virtualenv .venv
New python executable in /home/hxr/paper-search/.venv/bin/python
Installing setuptools, pip, wheel... done.
[hxr@leda:~/paper-search]$ . .venv/bin/activate
(.venv) [hxr@leda:~/paper-search]$
```

The `(.venv)` prefix indicates that our virtualenv environment is active. We can exit it by running `deactivate` whenever you're done (or just closing the terminal). Whenever you need to re-activate it just run `. .venv/bin/activate`.

Virtualenvs work by making some changes to your python path and to your terminal prompt (called the [PS1](https://linuxconfig.org/bash-prompt-basics) (ooh this is [neat](http://bashrcgenerator.com/), a PS1 builder)) which is why you'll see the `(.venv)` whenever it is active.

### Installing Django

We need to install django with the python package manager pip. Normally you do not specify the `==1.10` bit, I have specified version 1.10 so that this tutorial will keep functioning as-is, otherwise future changes in Django might cause it to break.

```console
(.venv) [hxr@leda:~/paper-search]$ pip install django==1.10
Collecting django==1.10
Downloading Django-1.10-py2.py3-none-any.whl (6.8MB)
100% |████████████████████████████████| 6.8MB 191kB/s
Installing collected packages: django
Successfully installed django-1.10
```

Once django is installed, it provides a command `django-admin` for us which will allow us to `startproject`.

(Aside: Django has "projects" (the top level thing) and then "apps" inside. Projects contain one or more apps, apps provide functionality like some [models, views, and controllers](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). Apps are intended to allow generic functionality to be re-used across projects. If you found yourself re-implementing, say, a set of login/logout templates, URLs, and models, you might separate these into an "App" that you could use in multiple projects)

```console
(.venv) [hxr@leda:~/paper-search]$ django-admin startproject
usage: django-admin startproject [-h] [--version] [-v {0,1,2,3}]
                                 [--settings SETTINGS]
                                 [--pythonpath PYTHONPATH] [--traceback]
                                 [--no-color] [--template TEMPLATE]
                                 [--extension EXTENSIONS] [--name FILES]
                                 name [directory]
django-admin startproject: error: You must provide a project name.
```

Ok, it wants a name, but apparently `paper-search` isn't a valid name!

```console
(.venv) [hxr@leda:~/paper-search]$ django-admin startproject paper-search
CommandError: 'paper-search' is not a valid project name. Please use only numbers, letters and underscores.
```

We'll make it one word:

```console
(.venv) [hxr@leda:~/paper-search]$ django-admin startproject papersearch
(.venv) [hxr@leda:~/paper-search]$ ls
papersearch
```

This succeeded but it placed it in a subdirectory named `papersearch` which is annoying since we've already created a folder for this project. Let's wipe that out and try again, but this time we'll tell it to create it in this directory

```console
(.venv) [hxr@leda:~/paper-search]$ rm -r papersearch # Remove the directory
(.venv) [hxr@leda:~/paper-search]$ django-admin startproject papersearch . # Start the project, note the full stop at the end, this means "current working directory" and tells django-admin to create the project "here", where we currently are
(.venv) [hxr@leda:~/paper-search]$ ls
manage.py  papersearch
```

Success! The `manage.py` is a command you will become quite familiar with over time, and indicates the root of a django project.

### Creating an App

We'll call our main app `search`, but in this tutorial we likely won't split our code into multiple apps, for simplicity. (Would that be a useful tutorial? [File an issue](https://github.com/erasche/erasche.github.io/issues) if you'd like to see it)

```console
(.venv) [hxr@leda:~/paper-search]$ python manage.py startapp search
(.venv) [hxr@leda:~/paper-search]$ ls
manage.py  papersearch  search
```

If we look inside console, we'll see a bunch of files

```console
(.venv) [hxr@leda:~/paper-search]$ ls search
admin.py  apps.py  __init__.py  migrations  models.py  tests.py  views.py
```

- `admin.py` configures how models will be shown in the admin interface
- `apps.py` ... no idea what this one does
- `__init__.py` marks this folder as a python module and allows you to run `import search` when you're in python, in the root directory of your project.
- `migrations/` is a folder where your database migrations will go. You generally don't need to touch this other than to add the automatically generated changes to git
- `models.py` contains your models
- `tests.py` contains tests, if you choose to write them (we won't be, because <all the bad things "real" developers will tell you to make you feel bad about not doing things their way.> Don't be deterred, tests are really sufficient  but not necessary for a successful project)
- `views.py` contains any views we wish to render (python functions which return HTML content that the end user sees)


### House Cleaning

We should be tracking our project in a VCS like git. (There are other options, but I won't cover those.)

Let's initialize the git repo

```console
(.venv) [hxr@leda:~/paper-search]$ git init
Initialized empty Git repository in /home/hxr/paper-search/.git/
(.venv) [hxr@leda:~/paper-search]$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.venv/
	manage.py
	papersearch/
	search/

nothing added to commit but untracked files present (use "git add" to track)
```

Hmm, git mentions the .venv, we should set git up to ignore this for us, so we don't accidentally add it.

We will download a pre-generated `.gitignore` file. We can use the `curl` command to make a request to the web and the `>` to redirect the output of curl into a file called `.gitignore`

```console
(.venv) [hxr@leda:~/paper-search]$ curl https://www.gitignore.io/api/python,django > .gitignore
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1208  100  1208    0     0   2886      0 --:--:-- --:--:-- --:--:--  4910
```

If we check our git status, now we see:

```
(.venv) [hxr@leda:~/paper-search]$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.gitignore
	manage.py
	papersearch/
	search/

nothing added to commit but untracked files present (use "git add" to track)
```

We can now add the current directory (and everything in it)

```console
(.venv) [hxr@leda:~/paper-search]$ git add *
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   manage.py
	new file:   papersearch/__init__.py
	new file:   papersearch/settings.py
	new file:   papersearch/urls.py
	new file:   papersearch/wsgi.py
	new file:   search/__init__.py
	new file:   search/admin.py
	new file:   search/apps.py
	new file:   search/migrations/__init__.py
	new file:   search/models.py
	new file:   search/tests.py
	new file:   search/views.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.gitignore
```

Which is not quite what we want. We would like to track the `.gitignore` file as well. There is a very slight difference between `git add *` and `git add .`:

- `git add *` uses a "shell expansion", your terminal (bash, zsh, etc) sees the asterisk and expands that into listing everything in your current directory. However it does not include hidden files which begin with a full stop. For every item in the list, git recursively looks through it to find files to add, that aren't listed in your .gitignore.
- `git add .` however, tells git to add the current directory. Git recursively looks through it, but git (unlike your shell) does not ignore hidden files.

If we run

```
(.venv) [hxr@leda:~/paper-search]$ git add .
(.venv) [hxr@leda:~/paper-search]$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitignore
	new file:   manage.py
	new file:   papersearch/__init__.py
	new file:   papersearch/settings.py
	new file:   papersearch/urls.py
	new file:   papersearch/wsgi.py
	new file:   search/__init__.py
	new file:   search/admin.py
	new file:   search/apps.py
	new file:   search/migrations/__init__.py
	new file:   search/models.py
	new file:   search/tests.py
	new file:   search/views.py
```

We will see the desired output. We should next commit the changes we have staged:

```
(.venv) [hxr@leda:~/paper-search]$ git commit -a -m 'Initial project setup'

[master (root-commit) a75151a] Initial project setup
 13 files changed, 304 insertions(+)
```

### Running the Server

You are ready to run your server! (I.e. have python run this process which will listen on a port for incoming HTTP requests, usually from a browser. You will be able to open a browser to the URL django gives you and see the results of your labour)

```console
(.venv) [hxr@leda:~/paper-search]$ python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).

You have 13 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

September 13, 2016 - 11:16:11
Django version 1.10, using settings 'papersearch.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Oh, maybe not quite. Django tells us that we need to run some database migrations first. We quit the server with `<ctrl-c>` as mentioned in the output above. Django is (usually) quite good about these helpful hints, telling you to run this command or that command.

```console
(.venv) [hxr@leda:~/paper-search]$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Rendering model states... DONE
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying sessions.0001_initial... OK
```

Everything looks good, so let's re-start the server.

```console
(.venv) [hxr@leda:~/paper-search]$ python manage.py runserver
Performing system checks...

System check identified no issues (0 silenced).
September 13, 2016 - 11:18:49
Django version 1.10, using settings 'papersearch.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

(Aside: how did I know the next command was runserver? This is sortof accumulated knowledge from time using django. If you are completely new to Django, you may wish to read the [djangogirls](http://tutorial.djangogirls.org) tutorial first. They have done an excellent job covering Django basics for building a blog.)

As you saw in the above terminal output, a development server (python process) is listening on [http://127.0.0.1:8000/](http://127.0.0.1:8000/). We can open that in our browser and see something like this:

<img src="/assets/img/django-haystack/init.png" />

Take a minute to feel good about your progress. If my tutorial missed something and you got lost along the way, please feel free to file an issue.

# Project

## Data Model

So our plan is that we will build a document search engine to help us find documents on our computer. This is a task which is already done by a number of other utilities (locate, ag/grep, various system indexers), but we will specifically be looking at storing and indexing the contents of some PDF files since those aren't always easily searchable.

If we're indexing papers, we will likely want to work at the level of a single PDF file. Our data model should reflect that in the models we build and the fields we will add to those models. At the most basic level, we probably want to have

- a pdf file (object)
	- a file path / file name
	- the file's contents (for searching on)

By starting here we can cover how to use django and haystack, and if you wish you can further build this project out to include things like viewing the PDFs in your browser or other fancy features like that.

The `papersearch` folder contains mostly project level setting and metadata, everything for the actual implementation of the search/models/views/controllers will go in `search`.

We will create a model representing our PDF file in `search/models.py`.

```python
from __future__ import unicode_literals

from django.db import models

# Create your models here.
```

We start with a pretty empty python file for models which can be totally intimidating. Even long time django users sometimes just stare at this file for a bit not remembering where to go next. I find that once I create the first model, things start flowing a bit more easily since I have models I can look at and say "oh, right, that's how you add a text field".

I often find myself searching for things like `django model` to find the [official Django documentation on models](https://docs.djangoproject.com/en/1.10/topics/db/models/). At the top we're given an example of a person class which we will adapt to our needs.

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

Our class will be quite similar!

```python
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

Let's adjust this a bit more

```python
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Paper(models.Model):
    file_path = models.CharField(max_length=1024)
    paper_contents = models.TextField()
```

I changed paper contents to be a text field so we don't have to specify a maximum length for the contents. We don't know what the text of papers will look like, but it'll likely be quite large. We could do the same for `file_path` as well. If you have deep directory structures that might be longer than 1024 characters, you may wish to change that to a textfield as well.

We can now make a migration for this model change which will generate a python file in `search/migrations/`. Django uses these files to modify the database (db.sqlite3 for this starter project).

```console
(.venv) [hxr@leda:~/paper-search]$ python manage.py makemigrations
No changes detected
```

That's odd. Oh, right, Django is a bit strange here... When we create a new app, we have to tell the main project that this new app exists. (You would think `startapp` would do this, but it doesn't.)

Edit the `papersearch/settings.py` file, and look for the word `INSTALLED_APPS`. It is a python list of modules that django loads whenever you `runserver`. At the end of the list, add `'search'`. It will look approximately like this:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'search',
 ]
```

Now django knows the app exists and `makemigrations` will succeed:

```
(.venv) [hxr@leda:~/paper-search]$ python manage.py makemigrations
Migrations for 'search':
  search/migrations/0001_initial.py:
    - Create model Paper
```

We can also migrate the database itself (making a migration just builds the migration step, it doesn't actually apply it because `$reasons`. We want to apply it.)

```
(.venv) [hxr@leda:~/paper-search]$ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, search, sessions
Running migrations:
  Rendering model states... DONE
  Applying search.0001_initial... OK
```

Success! We can `python manage.py runserver` and ... nothing has changed. Which is a bit underwhelming. Let's at least add our model to the admin interface, so we can see it there.

You can read the [django admin](https://docs.djangoproject.com/en/1.10/ref/contrib/admin/) pages for more detailed information, but my eyes just glaze over when they start with so much detailed and (to me) irrelevant information. The salient point from that page is the first code block in the aside which asks "Do you need a ModelAdmin object at all?" The answer to that is "no, we don't, and why did y'all start with one?"

```python
from django.contrib import admin
from myproject.myapp.models import Author

admin.site.register(Author)
```

Here we see them import Author form myproject.myapp.models (so this *should* translate into `from papersearch.search.models import Paper`) and then they register. Let's try it out:

```python
from django.contrib import admin
from papersearch.search.models import Paper

admin.site.register(Paper)
```

If we try and `runserver`, this crashes with the error

```
ImportError: No module named search.models
```

so we'll try a different way of importing:

```python
from search.models import Paper
```

which does work. If we go to the admin interface at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) we will be greeted with a login box. Whoops, we need to create a user first!

```console
(.venv) [hxr@leda:~/work/paper-search]$ python manage.py createsuperuser
Username (leave blank to use 'hxr'): 
Email address: 
Password: 
Password (again): 
Superuser created successfully.
```

Django recently added a password complexity filter so my default password of `p` or `password` no longer function during development. (I have found that there are a couple of four letter words (yes those kind) which when you type them twice will pass the password filters and tend to make for memorable passwords... `;)`)

If we launch our server again with `python manage.py runserver` we will be able to [login](http://127.0.0.1:8000/admin/) at the admin page and see the Paper model.

![](/assets/img/django-haystack/admin.png)

We can click the `+Add` to create a new paper, which we can fill out with dummy information like:

{: .table .table-striped}
Field          | Value
----           | ----
File path      | /home/hxr/test.pdf
Paper contents | Hello, World

Thinking forward to seeing whether or not search works, we might wish to add two papers so we can see results like A matches, B matches, A and B match, or nothing matches our search query. If we add something like the following we will be able to search on "Hello" and find both papers, or search on "World"/"Universe" to discriminate between them.

{: .table .table-striped}
Field          | Value
----           | ----
File path      | /home/hxr/test2.pdf
Paper contents | Hello, Universe

This is a good point to make a commit to your project in your VCS (`git add .; git commit -m "Added Paper model"`).

We have so far started a django project and created our first model! This is great progress.

## Haystack

At this point we're ready to start adding in haystack and whoosh.

We will start [part way through](http://django-haystack.readthedocs.io/en/v2.5.0/tutorial.html#installation) their instructions where it starts applying to us:

```console
pip install django-haystack
```

But wait! Don't run that command just yet. It isn't optimal that we have this list of dependencies that we're building up in our heads for our python project (django, now django-haystack). We should really list out these dependencies in a file. Python conventions have us store these in a `requirements.txt` file in the root of your repository (i.e. `~/paper-search/requirements.txt` for me.)

It will look something like this:

```
django==1.10
django-haystack
```

We can then run `pip install -r requirements.txt` and pull in any changes:

```console
(.venv) [hxr@leda:~/work/paper-search]$ pip install -r requirements.txt 
Collecting django-haystack (from -r requirements.txt (line 1))
...
Installing collected packages: django-haystack
Successfully installed django-haystack-2.5.0
```

### Basic Configuration

Just like we added our `search` app to the list of `INSTALLED_APPS`, we now add `haystack`. (This is the reason "apps" in django are so great, if you build something awesome like haystack built for search, you can package it up as a re-usable app and others can make use of your module.) The haystack documentation suggests we load it first, before we load our app, but I'm not sure if it makes any difference so we'll just do what they say:

```python
# papersearch/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'haystack',
    'search',
]
```

Somewhere in that same file we will need to add configuration for haystack's backend. As you remember there are a whole bunch of different backends but we'll be using 'Whoosh'.

```python
# papersearch/settings.py
import os
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.whoosh_backend.WhooshEngine',
        'PATH': os.path.join(os.path.dirname(__file__), 'whoosh_index'),
    },
}
```

This tells haystack to:

- use the whoosh backend
- store the whoosh index in a specific directory

That index directory is constructed from a few pieces:

- `__file__`, the full path of `papersearch/settings.py`
- `os.path.dirname(__file__)`, the parent directory, `papersearch/`
- `os.path.join(..., 'whoosh_index')`, a directory `papersearch/whoosh_index`

(It doesn't seem that you have to create this directory for haystack/whoosh, it looks like they will take care of it for us.)

### Search Indexing

> You generally create a unique SearchIndex for each type of Model you wish to index

The documentation here is a bit hard to read for someone not extremely well versed in django, so instead I'll do my best to go through their code.

```
import datetime
from haystack import indexes
from myapp.models import Note


class NoteIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    author = indexes.CharField(model_attr='user')
    pub_date = indexes.DateTimeField(model_attr='pub_date')

    def get_model(self):
        return Note

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.filter(pub_date__lte=datetime.datetime.now())
```

They create this model, NoteIndex, which apparently indexes Notes (so for us, Papers). There is a text field, an author field, and a date field.

> Every SearchIndex requires there be one (and only one) field with document=True. This indicates to both Haystack and the search engine about which field is the primary field for searching within.

I'm not sure what's special about the document field, but "primary field for searching" sounds like it would be the one we want to index. The `use_template=True` is important:

- whoosh doesn't index values/columns/model attributes in the database directly
- instead they allow you to template out your data, just like you do with views and templates in normal django.

This seems to be an important concept because you want to search across this primary `document` field but you may wish to be searching across multiple model atributes while you're doing it. If our "paper" model had an "author" field, we might want to search simultaneously across both the author list and the paper's contents. We can do that by using `document=True, use_template=True` and then providing a template which contains both the authors' names, and the paper's text.

They define a function `get_model` which returns the model used (much like `class Meta` in some django things, if you're familiar with that

And finally there is an `index_queryset` function that seems to return a list of models that we are interested in search against.
