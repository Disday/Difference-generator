install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

run:
	gendiff __fixtures__/dataset1/file1.json __fixtures__/dataset1/file2.json