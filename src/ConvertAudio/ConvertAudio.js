import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const ConvertAudio = () => {
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [audioSize, setAudioSize] = useState(null);
    const [compressedAudioBlob, setCompressedAudioBlob] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // State for error messages

    useEffect(() => {
        const loadLamejs = async () => {
        try {
            await import('lamejs'); // Load lamejs asynchronously
        } catch (error) {
            setErrorMessage('Error loading lamejs library. Please check the installation.');
        }
        };

        loadLamejs();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    // Inside useEffect to access the loaded lamejs:
    const { Mp3Encoder } = window.lamejs || {}; // Use optional chaining

    const handleAudioChange = async (event) => {
        const audioFile = event.target.files[0];
        setSelectedAudio(audioFile);

        if (audioFile) {
        const audioSizeInBytes = audioFile.size;
        const audioSizeInKB = audioSizeInBytes / 1024;
        setAudioSize(audioSizeInKB);
        }
    };

    const compressAudio = async () => {
        if (!selectedAudio) {
        setErrorMessage('Please select an audio file first.');
        return;
        }

        try {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const audioData = event.target.result;

            if (!Mp3Encoder) {
            setErrorMessage('Error: Mp3Encoder not found. Please check lamejs import.');
            return;
            }

            const encoder = new Mp3Encoder(1, 48000, 320); // 1 channel, 48000 Hz sample rate, 320 kbps (Higher Quality)
            const samples = new Int16Array(audioData);
            const mp3Data = encoder.encodeBuffer(samples);
            const audioBlob = new Blob([mp3Data], { type: 'audio/mp3' });
            setCompressedAudioBlob(audioBlob);
            setErrorMessage(null); // Clear any previous error messages
        };
        reader.readAsArrayBuffer(selectedAudio);
        } catch (error) {
        console.error('Error during compression:', error);
        setErrorMessage('An error occurred during compression. Please check the console for details.');
        }
    };

    const downloadCompressedAudio = () => {
        if (compressedAudioBlob) {
        const url = URL.createObjectURL(compressedAudioBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'compressed_audio.mp3';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        }
    };

    return (
        <div>
            <Header />
            <div class="flex flex-col py-40 px-20 min-h-screen bg-background">
                <div class="pb-10">
                    <div class="flex justify-center text-3xl lg:text-4xl">COMPRESS AUDIO</div>
                    <div class="flex justify-center text-md text-center lg:text-xl">Please Choose the Audio You Want to Compress</div>
                </div>
                <div class="flex items-center justify-center pb-4">
                    <input class="bg-white rounded-lg" type='file' accept="audio/*" onChange={handleAudioChange} />
                </div>
        
                {selectedAudio && (
                <div class="flex justify-center">
                    <div className="flex flex-col mt-4">
                    <div>
                        <audio controls src={URL.createObjectURL(selectedAudio)} />
                    </div>
                    <div className="ml-4 flex justify-center">Original Size: {audioSize && audioSize.toFixed(2)} KB</div>
                </div>
                </div>
                )}
        
                <div class="flex justify-center pt-8">
                    <button class="hover:bg-blue rounded-lg w-40 bg-dark border-dark text-white p-2" onClick={compressAudio}>Compress Audio</button>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {compressedAudioBlob && (
                    <div class='pt-8'>
                        <div class="text-xl font-bold flex justify-center">Compression Success!</div>
                        <div class="flex justify-center">
                            <button class='mt-6 text-white hover:bg-blue rounded-lg w-60 bg-dark p-1' onClick={downloadCompressedAudio}>Download Compressed Audio</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default ConvertAudio;
