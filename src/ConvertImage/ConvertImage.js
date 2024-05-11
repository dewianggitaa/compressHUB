import React, { useState } from 'react';
import Header from '../Header/Header';

const ConvertImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageSize, setImageSize] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [compressedImageSize, setCompressedImageSize] = useState(null);
    const [compressing, setCompressing] = useState(false);

    const handleImageChange = async (event) => {
        const imageFile = event.target.files[0];
        setSelectedImage(imageFile);

        const imageSizeInBytes = imageFile.size;
        const imageSizeInKB = imageSizeInBytes / 1024;
        setImageSize(imageSizeInKB);
    };

    const compressImage = async (imageFile) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = 800;
                    const maxHeight = 600;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', 0.7);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(imageFile);
        });
    };

    const handleCompressClick = async () => {
        if (selectedImage) {
            setCompressing(true);
            const compressedImageBlob = await compressImage(selectedImage);
            setCompressedImage(URL.createObjectURL(compressedImageBlob));
            const compressedImageSizeInBytes = compressedImageBlob.size;
            const compressedImageSizeInKB = compressedImageSizeInBytes / 1024;
            setCompressedImageSize(compressedImageSizeInKB);
            setCompressing(false);
        }
    };

    return (
        <div class='bg-background min-h-screen'>
            <Header />
            <div class="flex flex-col py-40 px-20">
                <div class="pb-10">
                    <div class="flex justify-center text-3xl lg:text-4xl">COMPRESS IMAGE</div>
                    <div class="flex justify-center text-md text-center lg:text-xl">Please Choose the Image You Want to Compress</div>
                </div>
                <div class="flex items-center justify-center pb-4">
                    <input class="bg-white rounded-lg" type='file' onChange={handleImageChange} />
                </div>
                {selectedImage && (
                    <>
                        <div>
                            <div class="flex justify-center">
                                <h2>Selected Image:</h2>                        
                            </div>

                            <div class="flex justify-center">
                                <img className="h-40" src={URL.createObjectURL(selectedImage)} alt="Selected" />
                            </div>

                            <div class="flex justify-center">
                                {imageSize && (
                                    <p>Original image size: {imageSize.toFixed(2)} KB</p>
                                )}
                            </div>
                        </div>
                    </>
                    
                )}
                <div class="flex justify-center py-8">
                    <button class="bg-dark hover:bg-blue w-40 rounded rounded-lg p-2 text-white" onClick={handleCompressClick} disabled={!selectedImage || compressing}>
                        {compressing ? 'Compressing...' : 'Compress Image'}
                    </button>
                </div>
                
                {compressedImage && (
                    <div>
                        <div class="border border-black"></div>
                        <div class="flex justify-center pt-10">
                            <h2>Compressed Image:</h2>
                        </div>

                        <div class="flex justify-center">
                            <img className="h-40" src={compressedImage} alt="Compressed" />
                        </div>

                        <div class="flex justify-center">
                            {compressedImageSize && (
                                <p>Compressed image size: {compressedImageSize.toFixed(2)} KB</p>
                            )}
                        </div>

                        <div class="flex justify-center">
                            <a
                                href={compressedImage}
                                download="compressed_image.jpg"
                                className="text-white p-1 rounded-lg bg-dark w-60 text-center block mt-4 text-blue-500 hover:bg-blue"
                            >
                                Download Compressed Image
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConvertImage;
