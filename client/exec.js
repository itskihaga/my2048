const concurrently = require("concurrently");
concurrently(["webpack-dev-server --history-api-fallback","nodemon server"])