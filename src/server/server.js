const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');
const https = require('https');
// const fs = require('fs');
// const util = require('util');
const helpers = require('./helpers');

const { AUTH_TOKEN } = process.env;

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
//NOTE: получение настроек
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

  helpers
    .clear(settings)
    .then(() => helpers.gitClone(settings))
    .catch(e => console.error(e, 'error'));

  api
    .post('/conf', settings)
    // .then(response => console.log(response))
    .catch(e => console.error(e.code));

  res.end('POSTED');
});
//NOTE: удаляем настройки
app.delete('/api/settings', (req, res) => {
  api.delete('/conf').then(response => {
    if (response.status === 200) {
      res.send('settings deleted');
    }
  });
});
//NOTE: получаем очередь
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
//NOTE: получаем коммитхэш, идем в локальное хранилище, получаем информацию и формируем JSON для /build/request
app.post('/api/builds/:commitHash', (req, res) => {
  const { commitHash } = req.params;
  let settings = {};
  api
    .get('/conf')
    .then(response => {
      if (response.status === 200) {
        settings = response.data.data;
        return new Promise(resolve => resolve(settings));
      }
      return res.send(response.status);
    })
    .then(resolve => helpers.getCommitInfo(commitHash, resolve))
    .then(commitInfo => api.post('/build/request', commitInfo))
    .catch(e => {
      console.error(e.code, 'error');
    });

  // console.log(commitHash);
  res.send(commitHash);
});

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

app.listen(3000);
