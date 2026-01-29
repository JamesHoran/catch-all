module.exports = {
  apps: [
    {
      name: 'catch-all-dev',
      script: '/usr/bin/pnpm',
      args: 'dev',
      cwd: '/home/coder/catch-all',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 5000,
      min_uptime: '15s',
      listen_timeout: 30000,
      kill_timeout: 5000,
    },
  ],
};
