import nock from 'nock';
import VoiceText, { VoiceTextParams } from '../VoiceText';

const apiKey = 'VoiceTextAPIKEY';
const vt = new VoiceText(apiKey);

const host = 'http://localhost';

// set axios instance for test
vt.baseUrl = host;

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

test('success tts request', async () => {
  const resBuf = new Buffer('tts');
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker;
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, resBuf);

  const tts = await vt.tts('hello', 'show');
  await expect(tts).toMatchObject(resBuf);
});

test('error tts request', async () => {
  const errMessage = 'tts error';
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker;
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(400, errMessage);

  await expect(vt.tts('hello', 'show')).rejects.toHaveProperty(
    ['response', 'data'],
    errMessage
  );
});

test('success wav request', async () => {
  const resBuf = new Buffer('wav');
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'wav';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, resBuf);

  const wav = await vt.wav('hello', 'show');
  await expect(wav).toMatchObject(resBuf);
});

test('error wav request', async () => {
  const errMessage = 'wav error';
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'wav';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(400, errMessage);

  await expect(vt.wav('hello', 'show')).rejects.toHaveProperty(
    ['response', 'data'],
    errMessage
  );
});

test('success ogg request', async () => {
  const resBuf = new Buffer('ogg');
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'ogg';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, resBuf);

  const wav = await vt.ogg('hello', 'show');
  await expect(wav).toMatchObject(resBuf);
});

test('error ogg request', async () => {
  const errMessage = 'ogg error';
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'ogg';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(400, errMessage);

  await expect(vt.ogg('hello', 'show')).rejects.toHaveProperty(
    ['response', 'data'],
    errMessage
  );
});

test('success mp3 request', async () => {
  const resBuf = new Buffer('mp3');
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'mp3';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(200, resBuf);

  const mp3 = await vt.mp3('hello', 'show');
  await expect(mp3).toMatchObject(resBuf);
});

test('error mp3 request', async () => {
  const errMessage = 'mp3 error';
  nock(host)
    .post(vt.url, (body: VoiceTextParams) => {
      return body && body.text && body.speaker && body.format === 'mp3';
    })
    .basicAuth({
      user: apiKey,
      pass: '',
    })
    .reply(400, errMessage);

  await expect(vt.mp3('hello', 'show')).rejects.toHaveProperty(
    ['response', 'data'],
    errMessage
  );
});
