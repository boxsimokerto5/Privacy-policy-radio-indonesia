export type Language = 'id' | 'en';

export interface PermissionItem {
  id: string;
  code: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
  category: { id: string; en: string };
  requiredLevel: { id: string; en: string };
}

export interface AdPartner {
  name: string;
  company: string;
  role: { id: string; en: string };
  url: string;
}

export interface PolicySection {
  number: string;
  id: string;
  title: { id: string; en: string };
  summary: { id: string; en: string };
}

export const APP_METADATA = {
  appName: 'Radio Indonesia - Suara Nusantara',
  shortName: 'Radio Indonesia',
  packageName: 'com.radioindonesia.gecckocreator',
  developerName: 'gecckocreator',
  developerEmail: 'eccko.w4@gmail.com',
  effectiveDate: {
    id: '6 Oktober 2026',
    en: 'October 6, 2026',
  },
  isoDate: '2026-10-06',
  platform: 'Google Play Store (Android)',
  targetAudience: '13+',
  encryptionProtocol: 'HTTPS / TLS 1.3 (Transport Layer Security)',
};

export const POLICY_SECTIONS: PolicySection[] = [
  {
    number: '01',
    id: 'informasi-lokal',
    title: {
      id: 'Informasi yang Disimpan Secara Lokal di Perangkat',
      en: 'Information Stored Locally on Your Device',
    },
    summary: {
      id: 'Tanpa registrasi akun; seluruh preferensi disimpan di memori internal perangkat (Android SharedPreferences).',
      en: 'No account registration required; all preferences are stored locally in device memory (Android SharedPreferences).',
    },
  },
  {
    number: '02',
    id: 'izin-aplikasi',
    title: {
      id: 'Izin Aplikasi yang Digunakan (App Permissions)',
      en: 'Application Permissions Used (App Permissions)',
    },
    summary: {
      id: 'Rincian 5 izin sistem operasi Android yang dibutuhkan untuk pemutaran streaming radio tanpa terputus.',
      en: 'Details of the 5 Android OS permissions required for uninterrupted online radio streaming.',
    },
  },
  {
    number: '03',
    id: 'periklanan-pihak-ketiga',
    title: {
      id: 'Layanan Periklanan Pihak Ketiga & Pengumpulan Data Otomatis',
      en: 'Third-Party Advertising Services & Automated Data Collection',
    },
    summary: {
      id: 'Transparansi SDK mediasi iklan resmi (Unity LevelPlay/ironSource, Meta Audience Network, Google Play Services).',
      en: 'Transparency on official ad mediation SDKs (Unity LevelPlay/ironSource, Meta Audience Network, Google Play Services).',
    },
  },
  {
    number: '04',
    id: 'keamanan-data',
    title: {
      id: 'Keamanan Data & Enkripsi',
      en: 'Data Security & Encryption',
    },
    summary: {
      id: 'Perlindungan transmisi jaringan menggunakan enkripsi protokol HTTPS/TLS.',
      en: 'Network transmission protection using HTTPS/TLS protocol encryption.',
    },
  },
  {
    number: '05',
    id: 'retensi-kontrol',
    title: {
      id: 'Retensi, Kontrol Pengguna & Penghapusan Data',
      en: 'Data Retention, User Controls & Deletion',
    },
    summary: {
      id: 'Panduan langkah demi langkah mengatur ulang ID Iklan Google dan menghapus data lokal.',
      en: 'Step-by-step guide to resetting your Google Advertising ID and clearing local storage.',
    },
  },
  {
    number: '06',
    id: 'privasi-anak',
    title: {
      id: 'Perlindungan Privasi Anak-Anak',
      en: "Children's Privacy Protection",
    },
    summary: {
      id: 'Ketentuan batas usia pengguna umum (13 tahun ke atas).',
      en: 'General audience age threshold policy (13 years and older).',
    },
  },
  {
    number: '07',
    id: 'hak-cipta',
    title: {
      id: 'Hak Cipta Siaran Radio',
      en: 'Radio Broadcast Copyright Notice',
    },
    summary: {
      id: 'Pengakuan hak kekayaan intelektual lembaga penyiaran resmi di seluruh Nusantara.',
      en: 'Intellectual property acknowledgment for official broadcasting institutions across the Archipelago.',
    },
  },
  {
    number: '08',
    id: 'perubahan-kebijakan',
    title: {
      id: 'Perubahan pada Kebijakan Privasi Ini',
      en: 'Changes to This Privacy Policy',
    },
    summary: {
      id: 'Prosedur pembaruan dokumen sesuai perkembangan fitur atau regulasi Google Play.',
      en: 'Document update procedures aligned with feature updates or Google Play regulations.',
    },
  },
  {
    number: '09',
    id: 'hubungi-kami',
    title: {
      id: 'Hubungi Kami (Contact Us)',
      en: 'Contact Us',
    },
    summary: {
      id: 'Saluran komunikasi resmi pengembang untuk pertanyaan dan permintaan privasi.',
      en: 'Official developer communication channel for privacy inquiries and requests.',
    },
  },
];

export const PERMISSIONS_LIST: PermissionItem[] = [
  {
    id: 'a',
    code: 'android.permission.INTERNET & ACCESS_NETWORK_STATE',
    title: {
      id: 'Akses Internet & Status Jaringan',
      en: 'Internet Access & Network State',
    },
    description: {
      id: 'Digunakan untuk memuat katalog stasiun radio, mengambil data prakiraan cuaca publik BMKG, memuat tayangan iklan, serta memutar aliran audio (audio stream) dari server penyiaran radio.',
      en: 'Used to load the radio station catalog, fetch public BMKG weather forecast data, load advertisements, and stream audio from radio broadcasting servers.',
    },
    category: {
      id: 'Konektivitas & Streaming',
      en: 'Connectivity & Streaming',
    },
    requiredLevel: {
      id: 'Esensial / Normal',
      en: 'Essential / Normal',
    },
  },
  {
    id: 'b',
    code: 'android.permission.FOREGROUND_SERVICE & FOREGROUND_SERVICE_MEDIA_PLAYBACK',
    title: {
      id: 'Layanan Latar Depan Pemutaran Media',
      en: 'Media Playback Foreground Service',
    },
    description: {
      id: 'Digunakan agar pemutaran audio siaran radio tetap berjalan tanpa terputus ketika Anda membuka aplikasi lain (seperti WhatsApp/aplikasi pesan) atau saat layar ponsel dalam keadaan terkunci.',
      en: 'Ensures radio audio playback continues uninterrupted when you switch to other apps (such as WhatsApp/messaging apps) or when your phone screen is locked.',
    },
    category: {
      id: 'Pemutaran Latar Belakang',
      en: 'Background Playback',
    },
    requiredLevel: {
      id: 'Layanan Media',
      en: 'Media Service',
    },
  },
  {
    id: 'c',
    code: 'android.permission.POST_NOTIFICATIONS',
    title: {
      id: 'Notifikasi (Android 13+)',
      en: 'Notifications (Android 13+)',
    },
    description: {
      id: 'Digunakan pada Android 13 ke atas untuk menampilkan panel status siaran radio yang sedang aktif di bilah notifikasi (notification bar), sehingga Anda dapat mengetahui stasiun yang sedang mengudara dan kembali ke aplikasi dengan mudah.',
      en: 'Used on Android 13 and above to display the active radio broadcast status panel in the notification bar, allowing you to see the currently playing station and return to the app easily.',
    },
    category: {
      id: 'Kontrol Media Antarmuka',
      en: 'UI Media Controls',
    },
    requiredLevel: {
      id: 'Runtime (Opsional)',
      en: 'Runtime (Optional)',
    },
  },
  {
    id: 'd',
    code: 'android.permission.WAKE_LOCK',
    title: {
      id: 'Pengunci Layar / Prosesor',
      en: 'Processor / Screen Wake Lock',
    },
    description: {
      id: 'Digunakan oleh pemutar media (AndroidX Media3 ExoPlayer) agar koneksi streaming suara tidak terputus secara tiba-tiba saat layar perangkat meredup.',
      en: 'Used by the media player (AndroidX Media3 ExoPlayer) to prevent the audio streaming connection from dropping abruptly when the device screen dims.',
    },
    category: {
      id: 'Stabilitas ExoPlayer',
      en: 'ExoPlayer Stability',
    },
    requiredLevel: {
      id: 'Sistem Pemutar',
      en: 'Player System',
    },
  },
  {
    id: 'e',
    code: 'com.google.android.gms.permission.AD_ID',
    title: {
      id: 'Pengenal Iklan Google',
      en: 'Google Advertising ID',
    },
    description: {
      id: 'Digunakan oleh SDK mitra periklanan resmi untuk menayangkan iklan, membatasi frekuensi iklan (frequency capping), melakukan analitik performa iklan, serta mencegah aktivitas penipuan (fraud prevention).',
      en: 'Used by official advertising partner SDKs to serve ads, apply frequency capping, perform ad performance analytics, and conduct fraud prevention.',
    },
    category: {
      id: 'Dukungan Layanan Gratis',
      en: 'Free Service Support',
    },
    requiredLevel: {
      id: 'Dapat Direset Pengguna',
      en: 'User Resettable',
    },
  },
];

export const AD_PARTNERS: AdPartner[] = [
  {
    name: 'Unity LevelPlay / ironSource Mobile Ltd.',
    company: 'Unity Technologies / ironSource',
    role: {
      id: 'Mediasi Iklan & Jaringan Periklanan Seluler',
      en: 'Ad Mediation & Mobile Advertising Network',
    },
    url: 'https://unity.com/legal/privacy-policy',
  },
  {
    name: 'Meta Audience Network (Meta Platforms, Inc.)',
    company: 'Meta Platforms, Inc.',
    role: {
      id: 'Jaringan Penayangan Iklan Mitra',
      en: 'Partner Ad Serving Network',
    },
    url: 'https://www.facebook.com/about/privacy/',
  },
  {
    name: 'Google Play Services',
    company: 'Google LLC',
    role: {
      id: 'Infrastruktur Layanan Android & Pengenal Iklan',
      en: 'Android Services Infrastructure & Advertising ID',
    },
    url: 'https://policies.google.com/privacy',
  },
];

export const RAW_POLICY_TEXT_ID = `KEBIJAKAN PRIVASI (PRIVACY POLICY)
Aplikasi: Radio Indonesia - Suara Nusantara
Package Name: com.radioindonesia.gecckocreator
Tanggal Berlaku: 6 Oktober 2026

Selamat datang di Radio Indonesia ("Aplikasi"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengungkapkan informasi ketika Anda menggunakan aplikasi seluler Radio Indonesia (com.radioindonesia.gecckocreator) yang tersedia di Google Play Store.

Dengan mengunduh atau menggunakan Aplikasi ini, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.

1. INFORMASI YANG DISIMPAN SECARA LOKAL DI PERANGKAT
Aplikasi Radio Indonesia tidak mewajibkan pengguna untuk membuat akun atau melakukan pendaftaran (login). Data preferensi pengguna berikut disimpan sepenuhnya secara lokal di memori internal perangkat Anda (melalui Android SharedPreferences) dan tidak pernah dikirimkan atau disimpan di server kami:
- Nama tampilan profil dan kota domisili pilihan Anda.
- Daftar stasiun radio favorit dan riwayat stasiun terakhir yang diputar.
- Catatan jadwal siaran pada fitur Kalender di dalam aplikasi.

2. IZIN APLIKASI YANG DIGUNAKAN (APP PERMISSIONS)
Untuk menjalankan fungsi utamanya sebagai pemutar streaming radio online, Aplikasi memerlukan izin berikut pada sistem operasi Android:
a. Akses Internet & Status Jaringan (android.permission.INTERNET & ACCESS_NETWORK_STATE)
   Digunakan untuk memuat katalog stasiun radio, mengambil data prakiraan cuaca publik BMKG, memuat tayangan iklan, serta memutar aliran audio (audio stream) dari server penyiaran radio.
b. Layanan Latar Depan Pemutaran Media (android.permission.FOREGROUND_SERVICE & FOREGROUND_SERVICE_MEDIA_PLAYBACK)
   Digunakan agar pemutaran audio siaran radio tetap berjalan tanpa terputus ketika Anda membuka aplikasi lain (seperti WhatsApp/aplikasi pesan) atau saat layar ponsel dalam keadaan terkunci.
c. Notifikasi (android.permission.POST_NOTIFICATIONS)
   Digunakan pada Android 13 ke atas untuk menampilkan panel status siaran radio yang sedang aktif di bilah notifikasi (notification bar), sehingga Anda dapat mengetahui stasiun yang sedang mengudara dan kembali ke aplikasi dengan mudah.
d. Pengunci Layar / Prosesor (android.permission.WAKE_LOCK)
   Digunakan oleh pemutar media (AndroidX Media3 ExoPlayer) agar koneksi streaming suara tidak terputus secara tiba-tiba saat layar perangkat meredup.
e. Pengenal Iklan Google (com.google.android.gms.permission.AD_ID)
   Digunakan oleh SDK mitra periklanan resmi untuk menayangkan iklan, membatasi frekuensi iklan (frequency capping), melakukan analitik performa iklan, serta mencegah aktivitas penipuan (fraud prevention).

3. LAYANAN PERIKLANAN PIHAK KETIGA & PENGUMPULAN DATA OTOMATIS
Aplikasi Radio Indonesia disediakan secara gratis dan didukung oleh penayangan iklan. Kami bekerja sama dengan jaringan mediasi iklan pihak ketiga resmi yang dapat mengumpulkan dan memproses data tertentu secara otomatis dari perangkat Anda, yaitu:
- Pengenal Iklan Android (Google Advertising ID / AAID) dan App Set ID.
- Informasi teknis perangkat (model perangkat, versi sistem operasi Android, bahasa, dan operator jaringan).
- Alamat IP (Internet Protocol) sementara untuk memperkirakan wilayah umum (negara/kota) guna menampilkan iklan yang relevan.
- Data interaksi iklan (jumlah tayangan banner, native, interstitial, dan rewarded video) serta diagnostik kerusakan (crash logs).

Mitra Periklanan Pihak Ketiga yang digunakan dalam Aplikasi ini beserta tautan Kebijakan Privasi mereka:
- Unity LevelPlay / ironSource Mobile Ltd.: https://unity.com/legal/privacy-policy
- Meta Audience Network (Meta Platforms, Inc.): https://www.facebook.com/about/privacy/
- Google Play Services: https://policies.google.com/privacy

4. KEAMANAN DATA & ENKRIPSI
Seluruh komunikasi jaringan antara Aplikasi dan mitra layanan periklanan pihak ketiga dikirimkan melalui jalur koneksi aman yang dienkripsi menggunakan protokol HTTPS/TLS (Transport Layer Security).

5. RETENSI, KONTROL PENGGUNA & PENGHAPUSAN DATA
- Pengaturan Ulang / Penghapusan ID Iklan: Anda dapat mengatur ulang (reset) atau menghapus Pengenal Iklan Google (Advertising ID) kapan saja melalui perangkat Android Anda di menu: Pengaturan (Settings) > Google > Iklan (Ads) > Hapus ID Iklan / Reset ID Iklan.
- Penghapusan Data Lokal: Karena Aplikasi tidak membuat akun pengguna dan tidak menyimpan data pribadi di server kami, Anda dapat menghapus seluruh data preferensi lokal kapan saja dengan memilih menu "Hapus Data / Clear Storage" di pengaturan aplikasi Android atau dengan mencopot pemasangan (uninstall) Aplikasi Radio Indonesia dari perangkat Anda.

6. PERLINDUNGAN PRIVASI ANAK-ANAK
Aplikasi Radio Indonesia ditujukan untuk audiens umum berusia 13 tahun ke atas dan tidak dirancang khusus untuk anak-anak di bawah usia 13 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di bawah usia 13 tahun.

7. HAK CIPTA SIARAN RADIO
Seluruh aliran audio (audio streams), nama stasiun radio, frekuensi, slogan, dan logo stasiun yang ditampilkan di dalam Aplikasi merupakan hak cipta dan milik masing-masing lembaga penyiaran resmi terkait. Aplikasi Radio Indonesia hanya menyediakan direktori penautan streaming publik untuk memudahkan pendengar di seluruh Nusantara.

8. PERUBAHAN PADA KEBIJAKAN PRIVASI INI
Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu menyesuaikan dengan pembaruan fitur atau regulasi Google Play. Setiap perubahan akan ditampilkan pada halaman ini dengan memperbarui tanggal berlaku di bagian atas.

9. HUBUNGI KAMI (CONTACT US)
Apabila Anda memiliki pertanyaan, masukan, atau permintaan terkait Kebijakan Privasi ini maupun layanan Aplikasi Radio Indonesia, silakan hubungi kami melalui:
- Email Pengembang: eccko.w4@gmail.com`;

export const RAW_POLICY_TEXT_EN = `PRIVACY POLICY
Application: Radio Indonesia - Suara Nusantara
Package Name: com.radioindonesia.gecckocreator
Effective Date: October 6, 2026

Welcome to Radio Indonesia ("Application"). This Privacy Policy explains how we collect, use, protect, and disclose information when you use the Radio Indonesia mobile application (com.radioindonesia.gecckocreator) available on the Google Play Store.

By downloading or using this Application, you agree to the practices described in this Privacy Policy.

1. INFORMATION STORED LOCALLY ON YOUR DEVICE
The Radio Indonesia Application does not require users to create an account or register (log in). The following user preference data is stored entirely locally within your device's internal memory (via Android SharedPreferences) and is never transmitted to or stored on our servers:
- Your chosen display profile name and city of residence.
- Your list of favorite radio stations and recently played station history.
- Broadcast schedule notes within the in-app Calendar feature.

2. APPLICATION PERMISSIONS USED (APP PERMISSIONS)
To perform its primary function as an online radio streaming player, the Application requires the following permissions on the Android operating system:
a. Internet Access & Network State (android.permission.INTERNET & ACCESS_NETWORK_STATE)
   Used to load the radio station catalog, retrieve public BMKG weather forecast data, load advertisements, and play audio streams from radio broadcasting servers.
b. Media Playback Foreground Service (android.permission.FOREGROUND_SERVICE & FOREGROUND_SERVICE_MEDIA_PLAYBACK)
   Used so that radio broadcast audio playback continues uninterrupted when you open other applications (such as WhatsApp/messaging apps) or when the phone screen is locked.
c. Notifications (android.permission.POST_NOTIFICATIONS)
   Used on Android 13 and above to display the active radio broadcast status panel in the notification bar, allowing you to know which station is currently on air and return to the application easily.
d. Screen / Processor Wake Lock (android.permission.WAKE_LOCK)
   Used by the media player (AndroidX Media3 ExoPlayer) so that the audio streaming connection does not drop abruptly when the device screen dims.
e. Google Advertising ID (com.google.android.gms.permission.AD_ID)
   Used by official advertising partner SDKs to serve ads, limit ad frequency (frequency capping), perform ad performance analytics, and prevent fraudulent activity (fraud prevention).

3. THIRD-PARTY ADVERTISING SERVICES & AUTOMATED DATA COLLECTION
The Radio Indonesia Application is provided free of charge and is supported by advertising. We partner with official third-party ad mediation networks that may automatically collect and process certain data from your device, namely:
- Android Advertising ID (Google Advertising ID / AAID) and App Set ID.
- Technical device information (device model, Android operating system version, language, and network carrier).
- Temporary IP (Internet Protocol) address to estimate general region (country/city) in order to display relevant advertisements.
- Ad interaction data (impression counts for banner, native, interstitial, and rewarded video ads) as well as diagnostic crash logs.

Third-Party Advertising Partners used in this Application along with links to their Privacy Policies:
- Unity LevelPlay / ironSource Mobile Ltd.: https://unity.com/legal/privacy-policy
- Meta Audience Network (Meta Platforms, Inc.): https://www.facebook.com/about/privacy/
- Google Play Services: https://policies.google.com/privacy

4. DATA SECURITY & ENCRYPTION
All network communications between the Application and third-party advertising service partners are transmitted over a secure connection encrypted using the HTTPS/TLS (Transport Layer Security) protocol.

5. DATA RETENTION, USER CONTROLS & DELETION
- Resetting / Deleting Advertising ID: You can reset or delete your Google Advertising ID at any time through your Android device menu: Settings > Google > Ads > Delete advertising ID / Reset advertising ID.
- Deleting Local Data: Because the Application does not create user accounts and does not store personal data on our servers, you can delete all local preference data at any time by selecting "Clear Storage / Clear Data" in your Android application settings or by uninstalling the Radio Indonesia Application from your device.

6. CHILDREN'S PRIVACY PROTECTION
The Radio Indonesia Application is intended for a general audience aged 13 and older and is not specifically designed for children under the age of 13. We do not knowingly collect personal information from children under 13 years of age.

7. RADIO BROADCAST COPYRIGHT NOTICE
All audio streams, radio station names, frequencies, slogans, and station logos displayed within the Application are the copyright and property of their respective official broadcasting institutions. The Radio Indonesia Application solely provides a public streaming link directory to facilitate listeners across the Indonesian Archipelago (Nusantara).

8. CHANGES TO THIS PRIVACY POLICY
We may update this Privacy Policy from time to time to reflect feature updates or Google Play regulatory requirements. Any changes will be posted on this page by updating the effective date at the top.

9. CONTACT US
If you have any questions, feedback, or requests regarding this Privacy Policy or the Radio Indonesia Application services, please contact us via:
- Developer Email: eccko.w4@gmail.com`;
