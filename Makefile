install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

run:
	gendiff /Volumes/lullz/Учеба\ Фронтенд/frontend-project-46/file1.json file2.json