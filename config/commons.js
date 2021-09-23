module.exports = {
    proxies: {
        prod: {
            proxyUrl: ''
        }
    },
    sauce: {
        user: '',
        key: ''
    },
    appiumAddress: {
        hostname: 'localhost',
        port: 4723,
        path: '/wd/hub'
    },
    appiumvVersion: '1.15.0',
    appDetails: {
        ios: {
            protocol: 'https://',
            host: '',
            repo_path: '',
            app_name: 'PointOfSale.app'
        },
        android: {
            protocol: 'https://',
            host: '',
            repo_path: '',
            app_name: 'app-RELEASE_ENDPOINT-release.apk'
        }
    },
    maxParalleltests: 10,
    ilist: {
        recipients: ['sdevatha07@gmail.com']
    },
    secretKey: ''
};