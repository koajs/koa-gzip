TESTS = test/*.test.js
REPORTER = spec
TIMEOUT = 1000
MOCHA_OPTS =

install:
	@npm install --registry=http://r.cnpmjs.org

jshint: install
	@./node_modules/.bin/jshint .

test: install
	@node_modules/.bin/mocha \
	--harmony \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \
	$(MOCHA_OPTS) \
	$(TESTS) \

test-cov cov: install
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)
		@./node_modules/.bin/cov coverage

autod:
	@./node_modules/.bin/autod -w
	@$(MAKE) install

contributors:
	@./node_modules/.bin/contributors -f plain -o AUTHORS

.PHONY: test
