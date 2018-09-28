import VoiceText from './VoiceText';

const voiceText = (apiKey: string) => {
  return new VoiceText(apiKey);
};

export default voiceText;
export { VoiceText };

module.exports = voiceText;
module.exports.VoiceText = VoiceText;
