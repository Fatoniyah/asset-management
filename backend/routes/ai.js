const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/asset-analysis', async (req, res) => {
  const { asset } = req.body;
  if (!asset) {
    return res.status(400).json({ error: 'Asset data is required' });
  }

  // Mock response for testing
  let mockAnalysis = `ครุภัณฑ์ ${asset.assets_asset_name} มีอายุ ${asset.assets_useful_life_years} ปี และราคาซื้อ ${asset.assets_purchase_price} บาท.`;
  if (asset.assets_useful_life_years > 5) {
    mockAnalysis += ' แนะนำให้พิจารณาเปลี่ยนใหม่.';
  } else {
    mockAnalysis += ' สามารถใช้งานต่อได้.';
  }

  // Uncomment below to use real OpenAI API
  /*
  const prompt = `วิเคราะห์ครุภัณฑ์ต่อไปนี้และให้คำแนะนำในการจัดการ: ชื่อ ${asset.assets_asset_name}, อายุการใช้งาน ${asset.assets_useful_life_years} ปี, ราคาซื้อ ${asset.assets_purchase_price} บาท, สถานะ ${asset.assets_status}. พิจารณาจากอายุและมูลค่าเหลือ ควรซ่อม แทนที่ หรือใช้งานต่อ. ตอบสั้นๆ.`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const analysis = response.data.choices[0].message.content;
    res.json({ analysis });
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to analyze with AI' });
  }
  */

  res.json({ analysis: mockAnalysis });
});

module.exports = router;
