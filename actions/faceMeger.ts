import axios from 'axios';
import { uploadBase64ImageToS3, downloadAndUploadImage } from "@/lib/s3";
import FormData from 'form-data';
// 
export async function faceswapAI(swapImage: string, templateImageUrl: string) {
  // mock
  // return 'https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/YLRdeIBGH5nqPUBy7O6I3.png';
  //1.上传targetImage到oss
  const url = await uploadBase64ImageToS3(swapImage)
  // //2.调用faceswap接口生成requestId
  const requestId = await faceMeger(templateImageUrl, url)
  // 延迟3秒查询
  await delay(3000);
  // //3.请求查询requestId返回base64结果    
  let resultUrl;
  try {
    resultUrl = await getResult(requestId);
  }
  catch (e) {
    // 尝试第二次获取
    await delay(3000);
    resultUrl = await getResult(requestId);
  }
  // const resultUrl ='http://worker-images.ws.pho.to/i2/4531c195176f4f1edd6618d6dd4783c1ef5cef1a_result.jpeg';
  //4.上传到oss,todo 失败要重试
  const ossUrl = await downloadAndUploadImage(resultUrl)
  //5.todo 上传oss的文件？后续处理   

  //6.返回结果
  return ossUrl;
}
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    return data.result_url;
  } catch (error) {
    console.error(error);
  }
}



interface FaceMergeParams {
  apiKey: string;
  apiSecret: string;
  templateUrl: string;
  mergeUrl: string;
}

interface FaceMergeResult {
  request_id: string;
  result: string;
  time_used: number;
  error_message?: string;
}

/**
 * 获取人脸融合结果
 * @param {FaceMergeParams} params - API 参数
 * @return {Promise<FaceMergeResult>}
 */
async function getFaceMergeResult(params: FaceMergeParams): Promise<FaceMergeResult> {
  const apiUrl = 'https://api-cn.faceplusplus.com/imagepp/v1/mergeface';

  const requestData = {
    api_key: params.apiKey,
    api_secret: params.apiSecret,
    template_url: params.templateUrl,
    merge_url: params.mergeUrl,
  };

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'User-Agent': 'free-api',
      },
      timeout: 60000,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching result:', error);
    throw error;
  }
}