install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/beforeTree.json __tests__/__fixtures__/afterTree.json -f json
publish:
	npm publish
lint:
	npx eslint --format json .
test:
	npm test
