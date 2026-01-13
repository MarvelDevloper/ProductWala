const ratelimit = require('express-rate-limit')

const apiLimit = (limit, time) => {
    return ratelimit({
        windowMs: time,
        limit: limit,
        legacyHeaders: false,
        message:'Request limit exceeded pls try again after 15 minutes',
        standardHeaders: 'draft-8',
    })
}

module.exports=apiLimit