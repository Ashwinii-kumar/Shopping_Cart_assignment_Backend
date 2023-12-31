const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` per minute
    message:'Too many login attempts from this IP, please try again after a 60 second pause' ,
  
    
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = {rateLimiter}