const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


const logger = winston.createLogger({
    transports: [
        // new winston.transports.File({
        //     handleExceptions: true,            
        //     level: 'error',
        //     filename: 'error.log',
        //     format: winston.format.json()
        // }),       
        new winston.transports.Console({
            handleExceptions: true,
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        })
    ]
});



module.exports = logger;