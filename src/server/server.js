const path = require('path');
const express = require('express');
const axios = require('axios');
const https = require('https');
const util = require('util');

const exec = util.promisify(require('child_process').exec);
const spawn = util.promisify(require('child_process').spawn);

const AUTH_TOKEN = require('../../token.json').token;
const settingsMock = require('./settingsMock.json');

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/api/settings', (req, res) => {
  api.get('/conf').then(response => {
    let settings = {};
    if (response.status === 200) {
      settings = response.data.data;
    }
    res.send(settings);
  });
});
//NOTE: сохранение настроек и скачивание репозитория
app.post('/api/settings', (req, res) => {
  const settings = req.body;
  console.log(settings.repoName);
  console.log(settings.buildCommand);
  console.log(settings.mainBranch);
  console.log(settings.period);

  // const cloneRepo = spawn('git', ['clone', settings.repoName]).then(
  //   console.log
  // );

  async function gitClone() {
    try {
      // const { stdout, stderr } = await spawn('git', [
      //   'clone',
      //   `https://github.com/playhardgopro/${settings.repoName}.git`
      // ]);
      const cloneRepo = await spawn(
        'git',
        [
          'clone',
          `https://github.com/playhardgopro/${settings.repoName}.git`,
          '--progress'
        ],
        { cwd: './localStorage' }
      );
      cloneRepo.then(() => console.log(cloneRepo.stdout));
    } catch (e) {
      console.log(e);
    }
  }
  gitClone();

  api
    .post('/conf', settings)
    // .then(response => console.log(response))
    .catch(e => console.error(e.code));

  res.end('POSTED');
});

app.get('/api/builds', (req, res) => {
  api
    .get('/build/list')
    .then(response => {
      let list = [];
      if (response.status === 200) {
        list = response.data.data;
      }
      res.send(list);
    })
    .catch(e => console.error(e.code, 'error'));
  // res.end('GOT LIST');
});

app.post('/api/builds/:commitHash', (req, res) => {
  console.log(req.params.commitHash);
  res.send('POST');
});
//NOTE: start here
// app.get('/api/builds/:buildId', (req, res) => {
//   const { buildId } = req.params;

//   api
//     .get('/build/list')
//     .then(response => {
//       let buildById = [];
//       if (response.status === 200) {
//         const list = response.data.data;
//         buildById = list.filter(el => el.id === buildId);
//         // console.log(buildId, buildById);
//       }
//       res.send(buildById[0]);
//     })
//     .catch(e => console.error(e.code, 'error'));
// });

app.get('/api/builds/:buildId', (req, res) => {
  const { buildId } = req.params;

  api
    .get(`/build/details?buildId=${buildId}`)
    .then(response => {
      if (response.status === 200) {
        const buildDetails = response.data.data;
        // buildById = list.filter(el => el.id === buildId);
        // console.log(buildId, buildById);
        res.send(buildDetails);
      }
    })
    .catch(e => console.error(e.code, 'error'));
});

// app.get('/api/builds/:buildId/logs', (req, res) => {
//   counter += 1;

//   res.end(String(counter));
// });

app.listen(3000);
