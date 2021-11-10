install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

run-plain:
	gendiff __fixtures__/file1.json __fixtures__/file2.json -f plain

run:
	gendiff __fixtures__/file1.json __fixtures__/file2.json