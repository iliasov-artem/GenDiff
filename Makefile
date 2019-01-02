install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js _tests_/_fixtures_/before.json _tests_/_fixtures_/after.json
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test
