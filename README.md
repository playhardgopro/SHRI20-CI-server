- [DZ-tests](#dz-tests)
  - [Комментарии](#%d0%9a%d0%be%d0%bc%d0%bc%d0%b5%d0%bd%d1%82%d0%b0%d1%80%d0%b8%d0%b8)
  - [Запуск тестов](#%d0%97%d0%b0%d0%bf%d1%83%d1%81%d0%ba-%d1%82%d0%b5%d1%81%d1%82%d0%be%d0%b2)
- [DZ-3-nodejs](#dz-3-nodejs)
  - [Запуск](#%d0%97%d0%b0%d0%bf%d1%83%d1%81%d0%ba)
  - [API](#api)
    - [Комментарии](#%d0%9a%d0%be%d0%bc%d0%bc%d0%b5%d0%bd%d1%82%d0%b0%d1%80%d0%b8%d0%b8-1)
- [DZ-1-verstka](#dz-1-verstka)
    - [Установка](#%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0)
    - [Запуск dev сервера](#%d0%97%d0%b0%d0%bf%d1%83%d1%81%d0%ba-dev-%d1%81%d0%b5%d1%80%d0%b2%d0%b5%d1%80%d0%b0)
  - [Вопросы:](#%d0%92%d0%be%d0%bf%d1%80%d0%be%d1%81%d1%8b)
    - [Правильное использование БЭМ-сущностей](#%d0%9f%d1%80%d0%b0%d0%b2%d0%b8%d0%bb%d1%8c%d0%bd%d0%be%d0%b5-%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%91%d0%ad%d0%9c-%d1%81%d1%83%d1%89%d0%bd%d0%be%d1%81%d1%82%d0%b5%d0%b9)
    - [Консистентность](#%d0%9a%d0%be%d0%bd%d1%81%d0%b8%d1%81%d1%82%d0%b5%d0%bd%d1%82%d0%bd%d0%be%d1%81%d1%82%d1%8c)
    - [Адаптивность](#%d0%90%d0%b4%d0%b0%d0%bf%d1%82%d0%b8%d0%b2%d0%bd%d0%be%d1%81%d1%82%d1%8c)
  - [Выстрелы себе в ногу](#%d0%92%d1%8b%d1%81%d1%82%d1%80%d0%b5%d0%bb%d1%8b-%d1%81%d0%b5%d0%b1%d0%b5-%d0%b2-%d0%bd%d0%be%d0%b3%d1%83)

# DZ-tests

## Комментарии

- Интеграционными тестами я проверяю сценарии открытия всех страниц (скриншотами), также проверяю появление инпутов на странице настроек.

- Модульными тестами я решил проверить все actionCreators, замокал axios и проверяю, что он ходит по нужному адресу и кладет нужные данные в store.
- Также сделал тесты снэпшотами.

## Запуск тестов

- запускаем сам проект:

```bash
  npm run start
```

- запускаем селениум сервер:

```bash
  npm run test:server
```

- запускаем тесты гермионы (можно запустить GUI)

```bash
  npm run test:int (npm run test:hermione)
```

- запускаем тесты реакт компонентов:

```bash
cd client
npm run test
```

# DZ-3-nodejs

## Запуск

```
gulp server
```

- Token для авторизации записывается в файл **.env**, который нужно создать в корне репозитория.

```
AUTH_TOKEN=abracadabra
```

## API

- Получает JSON, валидирует его по схеме, проверяет и чистит локальное хранилище, скачивает репозиторий, получает информацию (commitHash, branchName, author, message) и отправляет ее в БД (добавляет в очередь).

```
POST localhost:3000/api/settings
```

- Получает сохраненные настройки из БД.

```
GET localhost:3000/api/settings
```

- Удаляет настройки из БД.

```
DELETE localhost:3000/api/settings
```

- Получение списка сборок

```
GET localhost:3000/api/builds
```

- Получает commitHash, забирает сохраненные настройки из БД, получает информацию (commitHash, branchName, author, message) и отправляет ее в БД (добавляет в очередь).

```
POST localhost:3000/api/builds/:commitHash
```

- Получает информацию о конкретной сборке

```
GET localhost:3000/api/builds/:buildId
```

- Получает логи билда, кеширование работает

```
GET localhost:3000/api/builds/:buildId/logs
```

### Комментарии

- Статические странички выдаются.
- Кеширование логов работает.
- Добавил валидацию по схеме.

# DZ-1-verstka

### Установка

```
npm install
```

### Запуск dev сервера

```
gulp
```

## Вопросы:

### Правильное использование БЭМ-сущностей

- какие части макета являются одним и тем же блоком?

  1. Футеры на всех страницах - это 1 блок.
  2. Хэдеры на всех страницах - это 2 блок.
  3. Форма в настройках - это 3 блок.
  4. Лэйбл + инпут в форме - это 4 блок.
  5. Карточка коммита на странице истории - это 5 блок.
  6. Лог на странице деталей - это 6 блок.
  7. Кнопки.
  8. Сделал иконки отдельным блоком, но пришел к этому не сразу (когда возникли проблемы с позиционированием).
  9. Текст я сделал отдельным блоком (но не уверен, что это правильно в данном случае)
  10. List - это блок списка, в котором находятся блоки карточек.

- какие стили относятся к блокам, а какие к элементам и модификаторам?

  1. Стили блоков - внутренние размеры блоков, цвет фона.
  2. Стили элементов - размеры, отступы, цвета, позиционирование.
  3. Модификаторы - отступы, цвета, размеры текста.

- где нужно использовать каскады и почему?

  1. Нужно использовать там, где от состояния родителя или соседа зависит состояние элемента.
  2. Использовал с инпутами, чтобы на фокусе подсветить и инпут, и кнопку справа от него.

### Консистентность

- какие видите базовые и семантические константы?
  1. Не понял вопроса.
- какие видите закономерности в интерфейсе?

  1. Много где заметил одинаковые отступы, основываясь на них и разделял на блоки. Пытался сделать размеры константами, не везде получилось. Судя по количеству получившихся переменных --space-\*, я где-то накосячил с выбором отступов.

### Адаптивность

- где видите вариативность данных и как это обрабатываете?

  1. Название репозитория может быть длинным, нужно адаптировать его.
  2. Наверняка в инпутах будет валидация. Пока никак не подготовился к этому, но и макета нет :)
  3. В инпутах могут быть длинные строки, надо ограничить кол-во разрешенных символов.

- какие видите особенности, связанные с размером экрана?
  1. Создал переменную --padding, чтобы обработать отступ слева и справа у контейнеров header'a, footer'a и основного. Можно было сделать через max-width, но адаптивность это не только про маленькие экраны. Мне показалось, что данным проектом больше будут пользоваться с десктопов (причем с большими экранами).
- что еще повлияло на вашу вёрстку?

  1. Очень много костылей, возможно, было бы лучше, если бы была возможность пообщаться с дизайнером (знать какой смысл он вкладывал в каждый элемент и как видит увеличение/сужение экрана).
  2. Время. Сильно не хватило времени.
  3. Мало опыта верстки с нуля. Ответил на первые вопросы - начал верстать. Сделал два экрана и осознал, что на блоки разбил не оч разумно. Переделывал.

## Выстрелы себе в ногу

1. За основу взял свое решение тестового задания. Отсюда может быть много неиспользованных классов в html. Когда кол-во строк выросло, начал путаться что и где.
2. Очень много времени потратил в самом начале (сделал один элемент, начал его причесывать и тд.), а потом все стало гореть.
3. Рассмотрел иконки, как элемент и просто вставлял их в span перед текстом кнопки. Пришлось переделывать.
4. Ближе к дедлайну начал спешить и криво подгонять верстку под макет. Есть вероятность (примерно 100%), что там не пиксельперфект.
5. Получилось много медиа запросов, наверное, это не очень хорошо. Костыли, они по-всюду.

```

```
