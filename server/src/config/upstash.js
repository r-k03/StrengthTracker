const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
require('dotenv').config();
 
// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

module.exports = ratelimit;