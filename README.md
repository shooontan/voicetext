# @shooontan/voicetext

[![npm version](https://badge.fury.io/js/%40shooontan%2Fvoicetext.svg)](https://badge.fury.io/js/%40shooontan%2Fvoicetext)
[![Build Status](https://travis-ci.org/shooontan/voicetext.svg?branch=master)](https://travis-ci.org/shooontan/voicetext)

Get audio data from [VoiceText](https://cloud.voicetext.jp/webapi) Web API.

## Install

```bash
# npm
$ npm install @shooontan/voicetext

# or yarn
$ yarn add @shooontan/voicetext
```

## Usage

```javascript
const fs = require('fs');
const voiceText = require('@shooontan/voicetext');

const apiKey = 'VoiceTextAPIKEY';
const vt = voiceText(apiKey);

(async () => {
  const text = 'おやすみ';
  const speaker = 'show';
  const bf1 = await vt.tts(text, speaker); // return Buffer
  const output1 = 'oyasumi.wav';
  fs.writeFile(output1, bf1, 'binary', error => {
    if (error) {
      console.log(error);
    }
  });

  const bf2 = await vt.mp3('ばいばい', 'haruka', {
    emotion: 'happiness',
    pitch: 160
  });
  const output2 = 'byebye.mp3';
  fs.writeFile(output2, bf2, 'binary', error => {
    if (error) {
      console.log(error);
    }
  });
})();
```

## Document

## voiceText(apiKey)

```javascript
const voiceText = require('@shooontan/voicetext');
const vt = voiceText('apiKey');
```

- apiKey: string

[https://cloud.voicetext.jp/webapi/api_keys/new](https://cloud.voicetext.jp/webapi/api_keys/new)

### vt.tts(text, speaker, [option])

```javascript
vt.tts(text, speaker, {...})
```

- text: `string` translated text.
- speaker: `string` speaker name.
  - `show`
  - `haruka`
  - `hikari`
  - `takeru`
  - `santa`
  - `bear`
- option: `object`
  - format: `string` data Format
    - `wav`
    - `ogg`
    - `mp3`
  - emotion: string
  - emotion_level: string
  - pitch: number
  - speaker: number
  - volume: number

vt.tts return audio buffer data from VoiceText WebAPI.

### vt.wav(text, speaker, [option])

```javascript
vt.wav(text, speaker, {...})
```

Same sa vt.tts, but option.format fix `wav`.

### vt.ogg(text, speaker, [option])

```javascript
vt.ogg(text, speaker, {...})
```

Same. option.format is `ogg`.

### vt.mp3(text, speaker, [option])

```javascript
vt.mp3(text, speaker, {...})
```

Same. option.format is `mp3`.

## VoiceText

[VoiceText official site](https://cloud.voicetext.jp/webapi)
