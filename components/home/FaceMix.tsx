"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
// import { GetStaticProps } from 'next';
import { WAITLIST_FORM_LINK } from "@/config/tiers";
import "react-toastify/dist/ReactToastify.css";
import ProgressImage from '@/components/ProgressImage';


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

    const [triggerConfetti, setTriggerConfetti] = useState<Number | null>(null);
    const [showOverlay, setShowOverlay] = useState<Boolean | null>(false);
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
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-bear.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-bucket.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-india-red.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-india-sali.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-king.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-kongqie.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-sleep.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-1-warp.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-10-beach.jpg",
        "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-airbllon.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-blue.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-boat.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-candy.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-egg.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-india-2.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-india-shen.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2-india-sleep.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-2y-beach.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-3-airplane.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-3-egg.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-3-india-f.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-3-story.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-4-apple.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-4-bannana.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-4-boat.png",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-4-dujia.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-4-tiyu.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-4-xiaochou.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-6-india.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-6-usa.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-7-meirenyu.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-7-rainbow.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-7638469_640.webp",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-7639781_640.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-candy.jpg",
        // "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/baby-red-bad.jpg"
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
        setShowOverlay(!showOverlay)
        // 当前时间戳
        setTriggerConfetti(Date.now())
        try {
            if (!uploadedFile) {
                toast.error("Please upload an image first.");
                return;
            }
            if (!selectedImage) {
                toast.error("Please Choose Template.");
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
                            toast.error(`${errmsg || response.statusText}`);
                            return;
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setSelectedImage(data.url);
                    setShowOverlay(false)
                    // 当前时间戳
                    setTriggerConfetti(Date.now())
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

    async function downloadImage() {
        try {
            if (!selectedImage) { return }
            // 使用 fetch 获取图片资源
            const response = await fetch(selectedImage);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status}`);
            }

            // 创建 Blob 对象
            const blob = await response.blob();

            // 创建一个隐藏的 <a> 标签
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);

            // 获取当前时间戳
            const timestamp = Date.now().toString();
            // 生成一个四位数的随机数
            const randomNumber = Math.floor(Math.random() * 9000 + 1000).toString();
            // 构建文件名
            const fileName = `image-${timestamp}-${randomNumber}`;

            link.setAttribute('download', `${fileName}.${getFileType(blob.type)}`);
            link.style.display = 'none';

            // 将链接添加到文档中并触发点击事件
            document.body.appendChild(link);
            link.click();

            // 清理工作
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    }


    function getFileType(mimeType: string): string {
        switch (mimeType) {
            case 'image/jpeg':
                return 'jpg';
            case 'image/png':
                return 'png';
            case 'image/gif':
                return 'gif';
            default:
                return 'unknown';
        }
    }

    function generateImageFileName(blob: Blob): string {
        // 获取当前时间戳
        const timestamp = Date.now().toString();
        // 生成一个四位数的随机数
        const randomNumber = Math.floor(Math.random() * 9000 + 1000).toString();
        // 构建文件名
        const fileNameBase = `image-${timestamp}-${randomNumber}`;

        // 根据MIME类型确定文件扩展名
        const mimeTypeToExtensionMap: { [key: string]: string } = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/webp': 'webp',
            // 添加更多映射
        };

        const extension = mimeTypeToExtensionMap[blob.type] || 'unknown';

        return `${fileNameBase}.${extension}`;
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
            <section className="flex flex-row md:flex-col bg-gray-100  w-[90%] mx-auto max-w-7xl">
                {/* Top side */}
                <div className="w-full md:w-100% p-6 overflow-y-auto flex flex-row space-x-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col md:w-30">
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
                        {/* <div className="bg-white rounded-lg shadow-md p-6 flex-grow"> */}
                        {<Button
                            type="button"
                            className="flex w-full  items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white mt-3"
                            onClick={handleGenerateImage}
                            disabled={isLoading} // 禁用按钮
                        >Generate</Button>}

                        {/* </div> */}
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
                        <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
                        <div className="flex space-x-4 pb-4 overflow-x-auto">
                            {imageList.map((image, index) => (
                                // <div className="inline-block">
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`Sample image ${index + 1}`}
                                    width={120}
                                    height={100}
                                    objectFit="cover"
                                    className={selectImageIndex === index ? 'border-4 border-black rounded-md cursor-pointer my-auto' : 'rounded-md cursor-pointer my-auto'}
                                    onClick={() => handleImageSelect(image, index)}
                                />
                                // </div>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Bottom side */}
                <div className="w-full h-500 p-6 flex items-center justify-center">
                    {selectedImage ? (
                        <div className="relative w-full h-full">
                            <ProgressImage
                                src={selectedImage}
                                alt="描述"
                                width={500}
                                height={300}
                                showOverlay={showOverlay}
                                durationInSeconds={10}
                                triggerConfetti={triggerConfetti}
                            />
                            {/* <Image
                                src={selectedImage}
                                alt="Selected image"
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                                unoptimized={true}
                            /> */}
                            <Button
                                type="button"
                                className="absolute items-center px-0 bg-gray-800 hover:bg-gray-900 text-white mt-3 min-w-10 right-0 bottom-10"
                                onClick={downloadImage}
                                disabled={isLoading} // 禁用按钮
                            >
                                <svg viewBox="0 0 1024 1024" version="1.1" width="200" height="200">
                                    <path d="M800 768H224a32 32 0 0 1-32-32V384a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64H256v288h512v-288h-32a32 32 0 0 1 0-64h64a32 32 0 0 1 32 32v352a32 32 0 0 1-32 32z m-320-236.8V288a32 32 0 1 1 64 0v242.56l40.96-40.96a32 32 0 0 1 45.12 45.12L537.6 627.2a31.936 31.936 0 0 1-25.6 12.8 32 32 0 0 1-22.72-9.28l-96-96a32 32 0 0 1 45.12-45.12l41.6 41.6z" fill="#ffffff" p-id="43585"
                                        data-spm-anchor-id="a313x.search_index.0.i21.4b363a811CBRfZ" className="selected"></path>
                                </svg>
                            </Button>
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
