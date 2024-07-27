import axios from 'axios';
import { uploadBase64ImageToS3 } from "@/lib/s3";
import FormData from 'form-data';
// 
export async function faceswapAI(swapImage: string, templateImageUrl: string) {
    //1.上传targetImage到oss
    const url = await uploadBase64ImageToS3(swapImage)
    //2.调用faceswap接口生成requestId
    const requestId = await faceMeger(templateImageUrl,url)
    //3.请求查询requestId返回base64结果
    const embedding = await getResult(requestId);
    //4.上传到oss
    const resultUrl = await uploadBase64ImageToS3(embedding)
    //5.todo 上传oss的文件？后续处理   

    //6.返回结果
    return {url:resultUrl};
}

async function faceMeger(targetUrl: string, swapUrl: string) {
    const data = new FormData();
    data.append('target_url', targetUrl);
    data.append('swap_url', swapUrl);

    const options = {
        method: 'POST',
        url: 'https://faceswap3.p.rapidapi.com/faceswap/v1/image',
        headers: {
            'x-rapidapi-key': '48ec94fc13msh3098cb586366342p115bdfjsndcb526f7795c',
            'x-rapidapi-host': 'faceswap3.p.rapidapi.com',
            ...data.getHeaders(),
        },
        data: data
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        const data = response.data.image_process_response;
        if (data.status !== 'OK') {
            throw new Error(data.description || 'Unknown error occurred');
        }
        return data.request_id;
    } catch (error) {
        console.error(error);
    }
}

async function getResult(requestId: string) {
    const data = new FormData();
    data.append('request_id', requestId);

    const options = {
        method: 'POST',
        url: 'https://faceswap3.p.rapidapi.com/result/',
        headers: {
            'x-rapidapi-key': '48ec94fc13msh3098cb586366342p115bdfjsndcb526f7795c',
            'x-rapidapi-host': 'faceswap3.p.rapidapi.com',
            ...data.getHeaders(),
        },
        data: data
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        const data = response.data.image_process_response;
        if (data.status !== 'OK') {
            throw new Error(data.description || 'Unknown error occurred');
        }
        return data.embedding;
    } catch (error) {
        console.error(error);
    }
}

