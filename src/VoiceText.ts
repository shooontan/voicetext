import url from 'url';
import axios, { AxiosInstance } from 'axios';
import qs from 'querystring';

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
  axios: AxiosInstance;

  // VoiceText Web API KEY
  apiKey: string;

  // VoiceText Base URL
  baseUrl = 'https://api.voicetext.jp';
  // VoiceText API URL
  url = '/v1/tts';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axios = axios.create({
      auth: {
        username: apiKey,
        password: '',
      },
      responseType: 'arraybuffer',
    });
  }

  get apiUrl() {
    return url.resolve(this.baseUrl, this.url);
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

    return this.axios
      .post(this.apiUrl, qs.stringify(params))
      .then(response => new Buffer(response.data))
      .catch(error => {
        if (error && error.response && error.response.data) {
          error.response.data = new Buffer(error.response.data).toString();
        }
        throw error;
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
