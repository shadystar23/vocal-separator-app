import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformPlayer = ({ url, color, label }) => {
  const waveformRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: color,
      progressColor: '#4a148c',
      responsive: true,
      height: 100,
    });

    wavesurfer.load(url);

    return () => wavesurfer.destroy();
  }, [url, color]);

  return (
    <div className="waveform-container mb-4">
      <div ref={waveformRef}></div>
      <p className="text-sm mt-2 text-center">{label}</p>
    </div>
  );
};

export default WaveformPlayer;