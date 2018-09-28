import voiceText, { VoiceText } from '../index';

test('VoiceText instance', () => {
  const apiKey = 'VoiceTextAPIKEY';

  const vt = voiceText(apiKey);
  expect(vt).toBeInstanceOf(VoiceText);
  expect(vt.apiKey).toBe(apiKey);
});
