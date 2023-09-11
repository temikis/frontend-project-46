install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

test:
	npm test

test-coverage:
	npx jest --coverage

run:
	gendiff /Volumes/lullz/Учеба\ Фронтенд/frontend-project-46/__fixtures__/file1.json __fixtures__/file2.json