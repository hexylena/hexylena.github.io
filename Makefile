deploy:
	bash deploy.sh

serve:
	hugo --buildDrafts serve

fetch_repo_data:
	for i in {1..5}; do curl https://api.github.com/users/erasche/repos?page=$i > repos.$i.json; done

top_repos:
	cat repos.*.json | jq -s add | jq 'sort_by(1-.stargazers_count)[0:5]'
