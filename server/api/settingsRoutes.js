const express = require('express');
const {
  Validator,
  ValidationError
} = require('express-json-validator-middleware');
const axios = require('axios');
const schemas = require('../schemas');
const helpers = require('../helpers');

const app = express();

const { validate } = new Validator({ allErrors: true });
const router = express.Router();

router.get('/', (req, res) => {
  // NOTE: получение настроек
  axios
    .get('/conf')
    .then(response => {
      let settings = {};
      if (response.status === 200) {
        settings = response.data.data;
      }
      res.send(settings);
    })
    .catch(e => e.code, 'get settings error');
});
router.post('/', validate({ body: schemas.settings }), (req, res) => {
  // NOTE: сохранение настроек и скачивание репозитория
  const settings = req.body;
  helpers
    .clear(settings)
    .then(resolvedSettings => helpers.gitClone(resolvedSettings))
    .catch(e => console.error(e, 'error'));

  axios
    .post('/conf', settings)
    .catch(e => console.error(e.code, 'post settings error'));

  res.end('POSTed settings');
});
router.delete('/', (req, res) => {
  // NOTE: удаляем настройки
  axios
    .delete('/conf')
    .then(response => {
      if (response.status === 200) {
        res.send('settings deleted');
      }
    })
    .catch(e => e.code, 'delete settings error');
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send('JSON is invalid');
    next();
  } else next(err);
});

module.exports = router;
