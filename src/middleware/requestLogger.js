import logger from '../config/logger.js';

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} | Payload : ${JSON.stringify(req.body)}`);

    const oldSend = res.send;
    res.send = function (data)  {
        logger.info(`API Response for ${req.method} ${req.originalUrl} : ${data}`);
        oldSend.apply(res, arguments);
    }

    next();
};

export default requestLogger;