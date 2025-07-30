const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(__dirname));

// 路由设置
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'posterpre_ios.html'));
});

app.get('/mobile', (req, res) => {
    res.sendFile(path.join(__dirname, 'posterpre_ios.html'));
});

app.get('/desktop', (req, res) => {
    res.sendFile(path.join(__dirname, 'posterpre1.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Mobile version: http://localhost:${PORT}/mobile`);
    console.log(`Desktop version: http://localhost:${PORT}/desktop`);
}); 