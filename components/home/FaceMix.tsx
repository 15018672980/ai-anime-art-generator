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

    const handleImageSelect = (image: string) => {
       
    };


    return (
        <section className="lg:max-w-4xl md:max-w-3xl w-[95%] px-4 sm:px-6 lg:px-8 pb-8 pt-8 md:pt-12 space-y-6 text-center">
            <div className="flex flex-col md:flex-row h-screen bg-gray-100">
                {/* Left side */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex-shrink-0">
                        <label className="block mb-4">
                            <span className="text-gray-700 font-semibold">Upload an image:</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                            />
                        </label>
                        {uploadedImage && (
                            <div className="mb-6">
                                <Image
                                    src={uploadedImage}
                                    alt="Uploaded image"
                                    width={300}
                                    height={300}
                                    className="rounded-lg shadow-sm mx-auto"
                                />
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
                        <h3 className="text-lg font-semibold mb-4">Sample Images</h3>
                        <div className="overflow-x-auto">
                            <div className="flex space-x-4 pb-4">
                                {imageList.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`flex-shrink-0 cursor-pointer transition-transform`}
                                        onClick={() => handleImageSelect(image)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Sample image ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-white">
                    <div className="w-full h-full flex items-center justify-center">
                        {selectedImage ? (
                            <div className="w-full h-full">
                                <Image
                                    src={selectedImage}
                                    alt="Selected image"
                                    layout="fill"
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
                </div>

            </div>
        </section>
    );
}
