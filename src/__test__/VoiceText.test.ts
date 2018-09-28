import nock from 'nock';
import VoiceText, { VoiceTextParams } from '../VoiceText';

const apiKey = 'VoiceTextAPIKEY';
const vt = new VoiceText(apiKey);

test('VoiceText apiUrl', () => {
  expect(vt.apiUrl).toBe('https://api.voicetext.jp/v1/tts');
});

test('throw validation error', () => {
  expect(() => {
    // @ts-ignore
    vt.validate({});
  }).toThrowError('text');

  expect(() => {
    // str.length above 200 words
    const text = 'hello'.repeat(40) + 'h';
    // @ts-ignore
    vt.validate({
      text,
    });
  }).toThrowError('200');

  expect(() => {
    const text = 'hello'.repeat(40);
    // @ts-ignore
    vt.validate({
      text,
    });
  }).toThrowError('speaker');

  expect(
    vt.validate({
      text: 'hello',
      speaker: 'show',
    })
  ).toBe(true);
});

test('request tts', async () => {
  nock(vt.baseUrl)
    .post('/v1/tts', (body: VoiceTextParams) => {
      return body && body.text && body.speaker;
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, new Buffer('tts'));

  const authorizedRes = await vt.tts('hello', 'show');
  await expect(authorizedRes).toMatchObject(new Buffer('tts'));
});

test('request wav', async () => {
  nock(vt.baseUrl)
    .post('/v1/tts', (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'wav';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, new Buffer('wav'));

  const wav = await vt.wav('hello', 'show');
  await expect(wav).toMatchObject(new Buffer('wav'));
});

test('request ogg', async () => {
  nock(vt.baseUrl)
    .post('/v1/tts', (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'ogg';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, new Buffer('ogg'));

  const wav = await vt.ogg('hello', 'show');
  await expect(wav).toMatchObject(new Buffer('ogg'));
});

test('request mp3', async () => {
  nock(vt.baseUrl)
    .post('/v1/tts', (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'mp3';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, new Buffer('mp3'));

  const mp3 = await vt.mp3('hello', 'show');
  await expect(mp3).toMatchObject(new Buffer('mp3'));
});
