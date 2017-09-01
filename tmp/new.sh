#!/bin/bash
hugo new post/$(date "+%Y-%m-%d")-$1.md --editor vim --format yaml
