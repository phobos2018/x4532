var port = (process.argv.length > 2) ? parseInt(process.argv[2]) : 4080;
require('cors-anywhere').createServer().listen(port, 'localhost');
//# sourceMappingURL=cors-proxy.js.map