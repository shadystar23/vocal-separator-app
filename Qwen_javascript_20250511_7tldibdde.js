// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        title: "AI Vocal Remover",
        description: "Separate vocals from music using AI.",
        upload_prompt: "Select an audio file",
        vocals: "Vocals",
        music: "Music",
        invalid_file: "Please select a valid audio file (MP3/WAV)."
      }
    },
    ar: {
      translation: {
        title: "فصل الصوت عن الموسيقى",
        description: "فصل الصوت عن الموسيقى باستخدام الذكاء الاصطناعي.",
        upload_prompt: "اختر الملفات",
        vocals: "الأصوات",
        music: "الموسيقى",
        invalid_file: "يرجى اختيار ملف صوتي صالح (MP3/WAV)."
      }
    }
  },
  lng: "ar", // اللغة الافتراضية
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;