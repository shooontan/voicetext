import url from 'url';
import request from 'request';

type Speaker = 'show' | 'haruka' | 'hikari' | 'takeru' | 'santa' | 'bear';
type Format = 'wav' | 'ogg' | 'mp3';
type Emotion = 'happiness' | 'anger' | 'sadness';

interface Options {
  format?: Format;
  emotion?: Emotion;
  emotion_level?: number;
  pitch?: number;
  speed?: number;
  volume?: number;
}

export interface VoiceTextParams extends Options {
  text: string;
  speaker: Speaker;
}

export default class VoiceText {
  // VoiceText Web API KEY
  apiKey: string;

  // VoiceText Base URL
  baseUrl = 'https://api.voicetext.jp';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  get apiUrl() {
    return url.resolve(this.baseUrl, '/v1/tts');
  }

  tts(text: string, speaker: Speaker, options?: Options) {
    const opts = Object.assign({}, options, {
      text,
      speaker,
    });
    return this.request(opts);
  }

  wav(text: string, speaker: Speaker, options?: Options) {
    const opts = Object.assign({}, options, {
      text,
      speaker,
      format: 'wav',
    });
    return this.request(opts);
  }

  ogg(text: string, speaker: Speaker, options?: Options) {
    const opts = Object.assign({}, options, {
      text,
      speaker,
      format: 'ogg',
    });
    return this.request(opts);
  }

  mp3(text: string, speaker: Speaker, options?: Options) {
    const opts = Object.assign({}, options, {
      text,
      speaker,
      format: 'mp3',
    });
    return this.request(opts);
  }

  request(params: VoiceTextParams) {
    this.validate(params);

    return new Promise((resolve, reject) => {
      request.post(
        this.apiUrl,
        {
          form: params,
          auth: {
            user: this.apiKey,
          },
          encoding: null, // return body as a Buffer
        },
        (error, response, body) => {
          if (error) {
            return reject(error);
          }
          if (response.statusCode !== 200) {
            return reject(JSON.parse(body.toString()));
          }
          return resolve(body);
        }
      );
    });
  }

  validate(params: VoiceTextParams) {
    const { text, speaker } = params;
    if (!text) {
      throw new Error('text must not be empty.');
    }

    if (text.length > 200) {
      throw new Error('text is too long. max length is 200.');
    }

    if (!speaker) {
      throw new Error('speaker must be specified.');
    }

    return true;
  }
}
