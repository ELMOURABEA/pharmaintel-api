 pharmaintel-api
  Intelligent pharmacist 
 Let’s make it happen, Dr. Mostafa Abd-el-Kader 💼💊

*📁 `app.js`*

```js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

// Routes
const interactionRoutes = require('./routes/interactions');
const recallRoutes = require('./routes/recalls');
const whoRoutes = require('./routes/who');

app.use('/api/interactions', interactionRoutes);
app.use('/api/recalls', recallRoutes);
app.use('/api/who', whoRoutes);

app.get('/', (req, res) => {
  res.send('PharmaIntel Bot API — Powered by COPILOT TO ACHIEVE — DR / MOSTAFA ABD-EL-KADER — IDEA @2025');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

*📁 `routes/interactions.js`*

```js
const express = require('express');
const router = express.Router();
const { checkInteractions} = require('../services/drugBankService');

router.post('/', async (req, res) => {
  try {
    const result = await checkInteractions(req.body.drugs);
    res.json(result);
} catch (err) {
    res.status(500).json({ error: 'Interaction check failed'});
}
});

module.exports = router;
```

---

*📁 `services/drugBankService.js`*

```js
const axios = require('axios');

async function checkInteractions(drugs) {
  const response = await axios.post('https://api.drugbank.com/v1/interactions', {
    drugs: drugs
}, {
    headers: { Authorization: `Bearer ${process.env.DRUGBANK_API_KEY}`}
});
  return response.data;
}

module.exports = { checkInteractions};
```

---

*📁 `routes/recalls.js`*

```js
const express = require('express');
const router = express.Router();
const { getRecalls} = require('../services/openFdaService');

router.get('/', async (req, res) => {
  try {
    const result = await getRecalls(req.query.ingredient);
    res.json(result);
} catch (err) {
    res.status(500).json({ error: 'Recall fetch failed'});
}
});

module.exports = router;
```

---

*📁 `services/openFdaService.js`*

```js
const axios = require('axios');

async function getRecalls(ingredient) {
  const url = `https://api.fda.gov/drug/enforcement.json?search=product_description:${ingredient}&limit=10`;
  const response = await axios.get(url);
  return response.data.results;
}

module.exports = { getRecalls};
```

---

*📁 `routes/who.js`*

```js
const express = require('express');
const router = express.Router();
const { fetchWHOArticles} = require('../services/whoService');

router.get('/', async (req, res) => {
  try {
    const result = await fetchWHOArticles();
    res.json(result);
} catch (err) {
    res.status(500).json({ error: 'WHO articles fetch failed'});
}
});

module.exports = router;
```

---

*📁 `services/whoService.js`*

```js
const axios = require('axios');

async function fetchWHOArticles() {
  const url = 'https://ghoapi.azureedge.net/api/Articles';
  const response = await axios.get(url);
  return response.data;
}

module.exports = { fetchWHOArticles};
```

---

*📁 `.env`*

```
DRUGBANK_API_KEY=https://api.drugbank.com/v1/interactions'
```
from openai import OpenAI
import os
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
response = client.responses.create(
    model="gpt-4o-mini",
    input="tell me a joke",
)
print(response.output[0].content[0].text)
import json
print(json.dumps(response_multimodal.__dict__, default=lambda o: o.__dict__, indent=4))
copy_Right_2025@DR_Mostafa_ELMOURABEA
 ( Full thanks for ALLAH)

……
