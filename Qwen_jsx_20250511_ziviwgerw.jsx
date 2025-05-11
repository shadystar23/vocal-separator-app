import React, { useState } from 'react';

const UploadComponent = ({ onProcessed }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const i18n = require('../i18n').default;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setLoading(true);

      // هنا يجب إرسال الملف إلى الخادم للتجريب فقط
      setTimeout(() => {
        setLoading(false);
        onProcessed(URL.createObjectURL(selectedFile), URL.createObjectURL(selectedFile));
      }, 2000);
    } else {
      alert(i18n.t("invalid_file"));
    }
  };

  return (
    <div className="upload-box border-2 border-dashed border-gray-600 p-6 rounded-lg text-center w-full max-w-md mx-auto">
      <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" id="audio-upload" />
      <label htmlFor="audio-upload" className="cursor-pointer block">
        <p className="text-lg">{i18n.t("upload_prompt")}</p>
        <p className="text-sm text-gray-400 mt-2">MP3/WAV</p>
      </label>
      {loading && <p className="text-green-400 mt-2">جارٍ المعالجة...</p>}
    </div>
  );
};

export default UploadComponent;