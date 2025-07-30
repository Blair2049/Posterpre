const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 添加调试中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 静态文件服务
app.use(express.static(__dirname));

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        port: PORT,
        files: {
            mobile: path.join(__dirname, 'posterpre_ios.html'),
            desktop: path.join(__dirname, 'posterpre1.html')
        }
    });
});

// 路由设置
app.get('/', (req, res) => {
    console.log('Serving mobile version at root');
    res.sendFile(path.join(__dirname, 'posterpre_ios.html'));
});

app.get('/mobile', (req, res) => {
    console.log('Serving mobile version');
    res.sendFile(path.join(__dirname, 'posterpre_ios.html'));
});

app.get('/desktop', (req, res) => {
    console.log('Serving desktop version');
    res.sendFile(path.join(__dirname, 'posterpre1.html'));
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// 404处理
app.use((req, res) => {
    console.log('404 - Not found:', req.url);
    res.status(404).json({ error: 'Not Found', url: req.url });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Available routes:`);
    console.log(`  - / (mobile version)`);
    console.log(`  - /mobile (mobile version)`);
    console.log(`  - /desktop (desktop version)`);
    console.log(`  - /health (health check)`);
}); 