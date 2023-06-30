// const UAParser = require('ua-parser-js');
// const crypto = require('crypto');
// const axios = require('axios');

// async function sendEvent(data, apiKey) {
//   try {
//     const response = await axios.post("http://localhost:4000/events", { data }, {
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${apiKey}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error sending event:', error);
//   }
// }

// function tracker(config) {
//   const apiKey = config.API_KEY;

//   return (req, res, next) => {
//     let parser = new UAParser();
//     parser.setUA(req.headers['user-agent']);
//     let result = parser.getResult();

//     const idVisitor = crypto.createHash('sha256').update(`${req.headers['user-agent']}${result.os.name}${result.browser.name}${result.device.model}${req.ip}`).digest('hex');

//     const userData = {
//       userAgent: req.headers['user-agent'],
//       browser: result.browser.name,
//       os: result.os.name,
//       device: result.device.model,
//       referrer: req.headers.referer || req.headers.referrer,
//       idVisitor: idVisitor,
//       service: config.service,
//     };

//     req.sendEvent = (data) => {
//       sendEvent(
//         {
//             idVisitor,
//             userData,
//             ...data,
//         },
//         apiKey
//       );
//     };

//     next();
//   };
// }

// module.exports = tracker;
