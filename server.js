const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
app.use(cors());
app.use(express.json());

const APP_ID = process.env.APP_ID || "YOUR_APP_ID";
const APP_CERT = process.env.APP_CERT || "YOUR_APP_CERT";

app.get('/', (req, res) => {
  res.send('LIKE Token Server Running!');
});

app.get('/token', (req, res) => {
  const channel = req.query.channel;
  const uid = req.query.uid || 0;
  if (!channel) return res.json({ error: 'channel required' });

  const role = RtcRole.PUBLISHER;
  const expire = 3600;
  const now = Math.floor(Date.now() / 1000);
  const privilegeExpire = now + expire;

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERT, channel, uid, role, privilegeExpire);
  res.json({ token, uid, channel, appId: APP_ID });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server on ' + PORT));
