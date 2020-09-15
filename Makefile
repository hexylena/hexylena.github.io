SHELL:=/bin/bash

def:
	bundle exec jekyll serve -P 4001 -H 0.0.0.0 --incremental

serve:
	source ~/.rvm/scripts/rvm && \
	rvm use 2.5.1@personal && \
	jekyll serve -P 4001

incremental:
	source ~/.rvm/scripts/rvm && \
	rvm use 2.5.1@personal && \
	jekyll serve --incremental -P 4001
