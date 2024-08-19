SHELL:=/bin/bash

all: $(ALL_ROFFS)

serve:
	bundle exec jekyll serve -H 0.0.0.0 --incremental

ALL_POSTS := $(wildcard _posts/*.md)
ALL_ROFFS := $(ALL_POSTS:md=roff)

_posts/%.roff: _posts/%.md
	pandoc -M section=7 -s -t man < $< > $@
