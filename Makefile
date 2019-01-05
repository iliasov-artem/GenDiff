install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/beforeTree.json __tests__/__fixtures__/afterTree.json
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test
