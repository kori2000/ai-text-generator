# ai-text-generator
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/kori2000/telegram-bot/blob/main/LICENSE)
[![Unicorn](https://img.shields.io/badge/nyancat-approved-ff69b4.svg)](https://www.youtube.com/watch?v=QH2-TGUlwu4)

A generic text is generated with the assistance of keywords via an AI

## Installation

Please adjust the .env file before starting the Container.

```bash
# Replace .ent.test with .env to work in prod enviroment

# Server Settings
SERVER_PORT=4600

# Authorization Token for huggingface.co
MODEL_URL=https://api-inference.huggingface.co/models/gpt2
BEARER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Starting

```bash
# 🏗️ Build docker image
make build

# 🚀 Start docker container
make up

# 🛑 Stop docker container
make down
```

API Call  `POST` request to:
```
http://localhost:4600/text
```

With `JSON` Body, where you put your keywords or sentence
```
{
    "keywords": "This is app, that creates description text for an app"
}
```

Will return the following result in `text/html`:
```
This is app, that creates description text for an app, similar to what I am writing here, as the result is..
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)