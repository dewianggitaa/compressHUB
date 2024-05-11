import React from 'react'

const WaveBuffer = (options) => {
    const { numChannels, sampleRate, length, data } = options;
    const audioContext = new AudioContext();

    this.getChannelData = function(channelIndex) {
        if (channelIndex >= numChannels) {
            throw new Error(`Invalid channel index: ${channelIndex}`);
        }
        return data ? data.slice(channelIndex * length, (channelIndex + 1) * length) : new Float32Array(length);
        };
    
        this.buffer = audioContext.createBuffer(numChannels, length, sampleRate);
        for (let channel = 0; channel < numChannels; channel++) {
        const channelData = this.getChannelData(channel);
        const bufferChannel = this.buffer.getChannelData(channel);
        bufferChannel.set(channelData);
        }
}

export default WaveBuffer


