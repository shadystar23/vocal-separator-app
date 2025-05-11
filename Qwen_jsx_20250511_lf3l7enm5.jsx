import React from 'react';

const DownloadButtons = ({ vocals, music }) => {
  const i18n = require('../i18n').default;

  return (
    <div className="flex justify-center gap-4 mt-4">
      {vocals && (
        <a href={vocals} download="vocals.wav" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
          {i18n.t("download_vocals")}
        </a>
      )}
      {music && (
        <a href={music} download="music.wav" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
          {i18n.t("download_music")}
        </a>
      )}
    </div>
  );
};

export default DownloadButtons;