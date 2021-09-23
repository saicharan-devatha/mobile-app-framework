module.exports = {
    configure: {
        overrideCapabilities: [
            {
                specNames: [""],
                platform: "android",
                capabilities: {
                    autoGrantPermissions: false,
                    appPackage: '',
                    appActivity: ''
                }
            }
        ]
    }
};
