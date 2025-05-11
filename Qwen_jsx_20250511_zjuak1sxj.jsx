// src/App.js
import React, { useState } from 'react';
import WavesurferPlayer from './components/WaveformPlayer';
import i18n from './i18n';

const App = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [vocalsUrl, setVocalsUrl] = useState(null);
  const [musicUrl, setMusicUrl] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      // هنا يمكنك إرسال الملف إلى الخادم لمعالجة الفصل
    } else {
      alert(i18n.t("invalid_file"));
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">{i18n.t("title")}</h1>
      <p className="mb-8">{i18n.t("description")}</p>

      {/* مربع الرفع */}
      <div className="upload-box mb-8">
        <input type="file" accept="audio/*" onChange={handleFileUpload} />
        <p>{i18n.t("upload_prompt")}</p>
      </div>

      {/* عرض الموجات الصوتية */}
      {audioFile && (
        <div className="flex flex-col gap-4">
          <WavesurferPlayer url={vocalsUrl || audioFile} color="#6c5ce7" label={i18n.t("vocals")} />
          <WavesurferPlayer url={musicUrl || audioFile} color="#2ecc71" label={i18n.t("music")} />
        </div>
      )}
    </div>
  );
};

export default App;