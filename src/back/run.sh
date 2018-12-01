if [[ $PRODUCTION = true ]]; then
  echo "PRODUCTION"
  node ./src/index.js
else
  echo "DEVELOPMENT"
  # node --debug=9229 index.js
  nodemon ./src/index.js
fi
