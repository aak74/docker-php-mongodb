# echo $PROCESS_TYPE

# node --debug=9229 index.js

if [[ $PRODUCTION = true ]]; then
  echo "PRODUCTION"
  node index.js
else
  echo "DEVELOPMENT"
  npm install
  nodemon index.js
fi
