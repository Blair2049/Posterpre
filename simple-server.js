const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(__dirname));

// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'OK', time: new Date().toISOString() });
});

// 主页 - 移动版
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'posterpre_ios.html'));
});

// 移动版
app.get('/mobile', (req, res) => {
    res.sendFile(path.join(__dirname, 'posterpre_ios.html'));
});

// 桌面版
app.get('/desktop', (req, res) => {
    res.sendFile(path.join(__dirname, 'posterpre1.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Mobile: http://localhost:${PORT}/mobile`);
    console.log(`Desktop: http://localhost:${PORT}/desktop`);
}); 