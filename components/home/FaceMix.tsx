"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function FaceMix({
    id,
    locale,
    langName,
}: {
    id: string;
    locale: any;
    langName: string;
}) {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectImageIndex, setSelectImageIndex] = useState<number | null>(null);
    const router = useRouter();

    // Sample image list - replace with your actual image list
    const imageList = [
        "/images/users/1.png",
        "/images/users/2.png",
        "/images/users/3.png",
        // Add more images as needed
    ];




    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleImageSelect = (image: string, index: number) => {
        setSelectImageIndex(index);
        setSelectedImage(image);
    };

    return (
        <section className="flex flex-col md:flex-row bg-gray-100  w-[90%] mx-auto max-w-7xl">
            {/* Left side */}
            <div className="w-full md:w-1/4 p-6 overflow-y-auto flex flex-col">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold">Upload an image:</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </label>
                    {uploadedImage && (
                        <Image
                            src={uploadedImage}
                            alt="Uploaded image"
                            width={300}
                            height={300}
                            className="rounded-lg shadow-sm mx-auto"
                        />
                    )}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
                    <h3 className="text-lg font-semibold mb-4">Sample Images</h3>
                    <div className="flex space-x-4 pb-4 overflow-x-auto">
                        {imageList.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Sample image ${index + 1}`}
                                width={100}
                                height={100}
                                className={selectImageIndex === index ? 'border-4 border-black rounded-md cursor-pointer' : 'rounded-md cursor-pointer'}
                                onClick={() => handleImageSelect(image, index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-3/4 p-6 flex items-center justify-center bg-white">
                {selectedImage ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={selectedImage}
                            alt="Selected image"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                        />
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">
                        <p className="text-xl font-semibold mb-2">No image selected</p>
                        <p>Upload an image or select one from the list to view it here.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
