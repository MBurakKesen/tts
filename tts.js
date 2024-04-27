const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');



process.env.GOOGLE_APPLICATION_CREDENTIALS="ttsDemo.json"

// Google Cloud Text-to-Speech client oluştur
const client = new textToSpeech.TextToSpeechClient();

// Ses dosyasını oluşturmak için metni belirt
const metin = 'Merhaba, dünya!';

// Ses parametrelerini belirle
const sesParametreleri = {
  input: { text: metin },
  voice: { languageCode: 'tr-TR', ssmlGender: 'NEUTRAL' }, // Dil kodu ve cinsiyeti belirle
  audioConfig: { audioEncoding: 'MP3' }, // Ses dosyası formatını belirle
};

// Ses dosyasını oluştur
client.synthesizeSpeech(sesParametreleri, (hata, cevap) => {
  if (hata) {
    console.error('Hata:', hata);
    return;
  }

  // Ses dosyasını diske yaz
  fs.writeFile('ses.mp3', cevap.audioContent, 'binary', (hata) => {
    if (hata) {
      console.error('Hata:', hata);
      return;
    }
    console.log('Ses dosyası oluşturuldu: ses.mp3');
  });
});
