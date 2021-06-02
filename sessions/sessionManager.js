const uuid = require('uuid');

let sessionStore = new Map();
let sidName = 'sID';
let sessionTimeout = 12000000

let sessionManager = function (req, res, next) {
    let sessionId = (req.query[sidName] || req.params[sidName]);

    console.log('Session: ' + sessionId);

    let sidRecord = sessionStore.get(sessionId);

    if(sidRecord !== undefined) {
        console.log('Fetched session: ' + sidRecord);
    }
    else {
        console.log('Session record is not found');
    }

    if(sidRecord && ((sidRecord.lastUser + sessionTimeout) < Date.now())) {
        sessionStore.delete(sidRecord.id);
        sidRecord = undefined;
        console.log('Session with id: ' + sessionId + ' has expired');
    }

    if(!sidRecord) {
        sidRecord = {id: uuid.v4(), created: Date.now()};
        sessionStore.set(sidRecord.id, sidRecord);
        console.log('Created new session: ' + sidName + ': ' + sidRecord.id);
    }

    sidRecord.lastUsed = Date.now();

    req.session = sidRecord;

    next();
}

module.exports = {sessionManager};