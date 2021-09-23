module.exports.useraccounts = {
    prod: {
        users: [
            {
                id: "",
                password: "3dc46db64bec10a6d45e94953d7eb1c0ae8a5c5eb5ee3a0e58bc8278998020b2F8muPlf14QNXPRHBBXrN1A==",
                business: true,
                pos: true
            }
        ]
    },
};

module.exports.getLoginCredentials = (env, typeof_useraccount = {
    business: true,
    pos: true
}) => {
    let findUser = (user) => {
        let keys = Object.keys(typeof_useraccount);
        let found = undefined;
        keys.forEach((key) => {
            if (user[key] === typeof_useraccount[key]) {
                if (found === undefined) {
                    found = true;
                } else {
                    found = found && true;
                }
            } else if (user[key] === undefined && typeof_useraccount[key] === false) {
                if (found === undefined) {
                    found = true;
                } else {
                    found = found && true;
                }
            } else {
                found = false;
            }
        });
        return found;
    };
    let users = require('./useraccounts').useraccounts[env].users.filter(findUser);
    if (users.length === 0) {
        return undefined;
    } else {
        return {
            id: users[0].id,
            password: require('../../lib/commonUtils').decrypt(users[0].password).toString()
        }
    }
};