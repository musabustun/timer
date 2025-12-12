module.exports = {
    apps: [
        {
            name: 'timer-web',
            script: 'npm',
            args: 'start',
            cwd: './apps/web',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
