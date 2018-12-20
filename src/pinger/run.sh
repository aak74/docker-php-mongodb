if [[ $PRODUCTION = true ]]; then
  echo "PRODUCTION"
  node ./src/index.js
else
  echo "DEVELOPMENT"
  # node --inspect-brk=0.0.0.0:5858 ./src/index.js
  nodemon ./src/index.js
fi
