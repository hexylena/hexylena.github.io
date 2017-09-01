help:
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

deploy: ## Deploy to github
	bash deploy.sh

serve: ## Serve a lcoal copy
	hugo --buildDrafts serve

fetch_repo_data:
	for i in {1..5}; do curl https://api.github.com/users/erasche/repos?page=$i > repos.$i.json; done

top_repos:
	cat repos.*.json | jq -s add | jq 'sort_by(1-.stargazers_count)[0:5]'
