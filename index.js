const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

// 示例根路径
app.get('/', (req, res) => {
  res.send('Welcome to BrisFlow Backend!');
});

// 获取水道数据的API调用
const fetchWaterwayData = async () => {
  try {
    const response = await axios.get('https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/cp14-waterway-corridors-overlay-waterway-centreline/records?limit=20');
    const waterwayData = response.data;
    console.log(waterwayData);  // 在终端中输出数据以进行调试
    return waterwayData;
  } catch (error) {
    console.error('Error fetching waterway data:', error);
    return null;
  }
};

// 设置API端点以返回水道数据给前端
app.get('/api/waterways', async (req, res) => {
  const data = await fetchWaterwayData();
  if (data) {
    res.json(data); // 将数据返回给前端
  } else {
    res.status(500).send('Failed to fetch waterway data');
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
