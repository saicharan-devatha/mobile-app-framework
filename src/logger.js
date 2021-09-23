import bunyan from 'bunyan';
import path from 'path';

const log = bunyan.createLogger({
    name: 'point of sales-ui-tests',
    level: 30,
    src: true,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'info',
            path: path.resolve('./logs/pos.log')
        }
    ]
});

export default log;