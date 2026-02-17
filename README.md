# Bağımlılıkları kurun

npm install

# Geliştirme sunucusunu başlatın

npm run dev

# Production build'ı önizleyin (Önerilen)

npm run build
npm run preview

### Önemli Not: ESM modülleri ve CORS politikaları gereği, dist/index.html dosyası doğrudan tarayıcıda (çift tıklayarak) çalışmaz. Lütfen npm run preview komutunu veya bir yerel sunucuyu (npx serve dist) kullanın.

## Bu projede Next.js yerine Vite tercih edilmesinin temel nedenleri şunlardır:

### Hız ve Hafiflik: Vite, geliştirme aşamasında (HMR) Next.js'e göre çok daha hızlı geri bildirim verir. Küçük ve orta ölçekli dashboard projeleri için gereksiz yükten kaçınmamızı sağlar.

### Client-Side Odaklı Yapı: Dashboard uygulaması yoğun olarak istemci tarafı etkileşimi (AI Chatbot, dinamik form hesaplamaları, tablo filtreleme) içerdiği için SSR (Server Side Rendering) ihtiyacı düşüktür. Pure React + Vite bu senaryo için en optimize çözümdür.
