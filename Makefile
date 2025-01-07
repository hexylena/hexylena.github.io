ALL_POSTS := $(wildcard _posts/*.md)
ALL_ROFFS := $(ALL_POSTS:md=roff)
SHELL:=/bin/bash

serve:
	bundle exec jekyll serve -H 0.0.0.0 --incremental --livereload

all: $(ALL_ROFFS)

_posts/%.roff: _posts/%.md
	pandoc -M section=7 -s -t man < $< > $@
