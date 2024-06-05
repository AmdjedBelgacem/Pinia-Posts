# Vue.js Pinia Gönderileri

## Giriş

Bu depo, Vue.js Test Projesi görevinin çözümünü içerir. Proje, Vue.js, Tailwind CSS ve diğer önerilen teknolojiler kullanılarak basit bir gönderme sayfası oluşturmayı gerektirir. Proficiency in Vue.js ve temel web geliştirme becerilerini göstermek amacıyla tasarlanmıştır.

## Proje Tanımı

Proje, kullanıcılarla etkileşimli bir web sayfası geliştirmeyi gerektirir. Kullanıcılar giriş yapabilir, bir API'den alınan gönderileri görüntüleyebilir, bunları başlık ve içeriklerine göre arayıp filtre edebilir ve her gönderiye ilişkin yorumları görüntüleyebilir ve yeni yorum ekleyebilirler. Bu işlem sayfa yenileme gerektirmeden yapılmalıdır.

## Tamamlanan Görevler

### Giriş Ekranı

- Başarılı kimlik doğrulamanın ardından kullanıcıları ana sayfaya yönlendiren bir giriş ekranı uygulandı. Önbellekteki bilgiler (`test@test.com` ve `test`) ile doğrulanır; gerçek bir API isteği yapılmaz.

### Ana Sayfa

- 'https://jsonplaceholder.typicode.com' API'sinden alınan gönderileri listeledi.
- Gönderileri başlık ve içeriklerine göre arama ve filtreleme yeteneği sağladı.

### Yorum Etkileşimi

- Her gönderiye ilişkin yorumları görüntüledi.
- Yeni yorum ekleyebildi ve onları sayfa yenileme olmadan görüntüleyebildi.

## Teknolojik Önerilere Uyma

- **Vue.js**: Proje Vue.js 2.7.7 sürümüyle başlatıldı.
- **Pinia**: Uygulama durum yönetiminde Pinia'nın kullanılmasını önerildi.
- **Axios**: API'den veri çekmek için Axios kullanıldı.
- **Tailwind CSS**: Modern ve özelleştirilebilir bir tasarım için Tailwind CSS kullanıldı.

## Değerlendirme Kriterleri

- **Kullanılabilirlik ve Estetik**: Kullanıcı arayüzünün kullanım kolaylığı ve estetiği üzerinde duruldu.
- **Temizlik ve Organizasyon**: Kod tabanı temiz ve düzenli tutulmuş, en iyi uygulamalara uyumludur.
- **Hata Yönetimi**: Uygulamada çeşitli yerlerde hata yönetimi mekanizmaları uygulanmıştır.

## Kurulum Belirteci

Proje lokal makinenize kurulum ve çalıştırma adımlarını takip etmek için aşağıdaki adımları izleyin:

1. Depoyu yerel makinenize klonlayın.
2. Bağımlılıkları `npm install` komutu ile yükleyin.
3. Geliştirme sunucusunu `npm run serve` komutu ile başlatın.

Lütfen, bu proje demonstrasyon amaçlıdır ve ortamınıza veya tercihlerinize bağlı olarak ayarlamanız gerekebilir.

## Sonuç

Bu proje, Vue.js, Tailwind CSS ve diğer önerilen teknolojilerle işbirliği yaparak fonksiyonel ve etkileşimli bir web uygulaması oluşturma yeteneğimizi göstermektedir. Rica ederim ki, görüşmeler sırasında daha fazla tartışma yapma olasılığınızı umuyorum.

Saygılarımla,

Amdjed Belgacem

### ===================================================================================================================================================

# Vue.js Pinia Posts

## Introduction

This repository contains the solution for the Vue.js Test Project task. The project involves creating a simple post page using Vue.js, Tailwind CSS, and other recommended technologies. The goal was to demonstrate proficiency in Vue.js and basic web development skills.

## Project Description

The project requires developing a user-interactive web page where users can log in, view posts fetched from an API, search and filter these posts, and interact with comments on each post without needing to refresh the page.

## Tasks Completed

### Login Screen

- Implemented a login screen that redirects users to the homepage upon successful authentication with predefined credentials (`test@test.com` and `test`). No actual API request is made; the system checks the entered information locally.

### Homepage

- Displayed posts fetched from the API at 'https://jsonplaceholder.typicode.com'.
- Enabled searching and filtering posts based on their title and content.

### Comments Interaction

- Allowed viewing comments for each post.
- Enabled adding new comments and displaying them without page refresh.

## Technical Recommendations Followed

- **Vue.js**: Started the project using Vue.js version 2.7.7.
- **Pinia**: Used Pinia for state management instead of Vuex.
- **Axios**: Utilized Axios to fetch data from the API.
- **Tailwind CSS**: Applied Tailwind CSS for a modern and customizable design.

## Evaluation Criteria

- **Usability and Aesthetics**: The user interface has been designed with usability and aesthetics in mind.
- **Cleanliness and Organization**: The codebase is clean and well-organized, adhering to best practices.
- **Error Management**: Proper error handling mechanisms have been implemented throughout the application.

## Setup Documentation

To set up and run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run serve`.

Please note that this project is intended for demonstration purposes and may require adjustments based on your environment or preferences.

## Conclusion

This project showcases my ability to work with Vue.js, Tailwind CSS, and other recommended technologies to build a functional and interactive web application. I hope you find it satisfactory and look forward to the possibility of discussing it further during the interview process.

Best regards,

Amdjed Belgacem
