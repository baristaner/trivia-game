# Proje Adı: React Bilgi Yarışması

## Proje Açıklaması:
Bu proje, kullanıcının çeşitli bilgi sorularına cevap verdiği basit bir oyun uygulamasını içermektedir. Kullanıcılar, doğru cevaplarla puan kazanır ve belirli bir süre içinde soruları yanıtlamak zorundadır.

## Proje Teknolojileri:
- React
- React Bootstrap
- HTML
- CSS
  
## Gereksinimler:
- Node.js
- npm veya yarn
  
# Kurulum:
1.	Proje dizininde terminali açın.
2.	npm install veya yarn install komutu ile bağımlılıkları yükleyin.
3.	npm start veya yarn start komutu ile projeyi başlatın.
   
## Önemli Notlar:
- Trivia soruları questions.json dosyasında JSON formatında bulunmaktadır.
- Oyun içindeki müzik dosyası public/music/music.mp3 dizininde bulunmaktadır.
- Sorular rastgele sırayla karıştırılarak kullanıcıya sunulmaktadır.
- Kullanıcının cevap verme süresi 15 saniyedir. Süre dolduğunda oyun sona erer.
- Kullanıcı doğru cevap verdiğinde 10 puan kazanır, yanlış cevap verdiğinde ise 5 puan kaybeder.
- Kullanıcının puanı localStorage'da saklanır ve oyun başladığında yüklenir.
- Oyun bitiminde, kullanıcıya toplam puanı ve oyunu sıfırlama seçeneği sunan bir modal görüntülenir.


