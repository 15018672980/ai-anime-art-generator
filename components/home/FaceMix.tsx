"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { GetStaticProps } from 'next';
import { WAITLIST_FORM_LINK } from "@/config/tiers";

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
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const router = useRouter();

    // Sample image list - replace with your actual image list

    async function getImages(): Promise<string[]> {
        const response = await fetch("/api/pictureManage", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        // 只读取一次响应流
        const data = await response.json();
        console.log("response data:", data); // 打印数据
        return data;
    }
    // const imageList:String[] = [""]; 
    let imageList: string[] = [
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/edhua.png",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/supperman.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/temp_001.jpg",
    ];

    // (async () => {
    //     try {
    //         imageList = await getImages();
    //         console.log("Image list:", imageList);
    //     } catch (error) {
    //         console.error("Error fetching images:", error);
    //     }
    // })();

    async function handleGenerateImage() {
        setIsLoading(true);
        try {
            if (!uploadedFile) {
                toast.error("Please upload an image first.");
                return;
            }

            // 将文件转换为 base64
            const base64String = await fileToBase64(uploadedFile);
            // const response = await fetch("/api/faceApi", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ sourFile: base64String, targetFileUrl: selectedImage }),
            // });

            // if (!response.ok) {
            //     const errmsg = await response.text();
            //     throw new Error(errmsg || response.statusText);
            // }

            // const data = await response.json();
            // setSelectedImage(data.url);

            fetch("/api/faceApi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sourFile: base64String, targetFileUrl: selectedImage }),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errmsg => {
                            throw new Error(errmsg || response.statusText);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setSelectedImage(data.url);
                })
                .catch(error => {
                    console.error("Error occurred:", error);
                });

            // router.push(`/picture/${data.id}`);
        } catch (error: any) {
            toast.error(`Failed to generate image: ${error.message}`);
            console.error("Failed to generate image:", error);
        } finally {
            setIsLoading(false);
        }
    }



    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file)
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleImageSelect = (image: string, index: number) => {
        setSelectImageIndex(index);
        setSelectedImage(image);
    };

    // 辅助函数：将文件转换为 base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };


    return (
        <>
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
                        <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
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

                    <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
                        {<Button
                            type="button"
                            className="flex w-full  items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={handleGenerateImage}
                            disabled={isLoading} // 禁用按钮
                        >Generate</Button>}

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
            <div className="w-[90%] mx-auto max-w-7xl mt-6 text-center">
                <p className="text-red-500 text-lg font-semibold">
                    Coming soon! Please join our{" "}
                    <a href={WAITLIST_FORM_LINK} className="underline text-blue-600 hover:text-blue-800">
                        waitlist
                    </a>
                    !
                </p>
            </div>
        </>



    );
}
