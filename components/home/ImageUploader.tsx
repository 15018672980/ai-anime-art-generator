"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [fullscreen, setFullscreen] = useState(false);

  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageList((prevList) => [...prevList, imageUrl]);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageClick = () => {
    setFullscreen(!fullscreen);
  };

  const handleGenerateClick = () => {
    // 在这里添加生成按钮的处理逻辑
    alert('生成按钮被点击');
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full h-screen">
      <div className="flex w-full h-full">
        <div className="flex flex-col items-center w-1/4 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <div className="flex overflow-x-auto space-x-2 w-full h-32">
            {imageList.map((imageUrl, index) => (
              <div
                key={index}
                className={`p-1 border rounded ${imageUrl === selectedImage ? 'border-blue-500' : 'border-gray-300'}`}
                onClick={() => setSelectedImage(imageUrl)}
              >
                <img src={imageUrl} alt={`uploaded ${index}`} className="w-24 h-24 object-cover cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
          {selectedImage && (
            <div
              className={`relative ${fullscreen ? 'w-screen h-screen' : 'w-full h-full'}`}
              onClick={handleImageClick}
            >
              <Image src={selectedImage} alt="Selected" layout="fill" objectFit="contain" />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleGenerateClick}
        className="bg-blue-500 text-white px-8 py-2 rounded-lg mt-4"
      >
        生成
      </button>
    </div>
  );
}
