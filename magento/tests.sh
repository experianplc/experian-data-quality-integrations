# Start simple server
python3 -m http.server &
simple_server=$!

npx intern functionalSuites=tests/functional/Experian/CustomerCustomAttributes/**/*.js

# Kill simple server
kill $simple_server

# Generate code coverage
npx nyc report --nycrc-path magento/.nycrc.json
