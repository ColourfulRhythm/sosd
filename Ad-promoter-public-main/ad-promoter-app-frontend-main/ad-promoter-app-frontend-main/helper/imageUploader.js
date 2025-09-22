import axios from '@/pages/api/axios';

const uploadImage = async (files) => {
  let imageURLs = [];
  const userToken = JSON.parse(localStorage.getItem('user-token'));

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  const response = await axios.post('/api/v1/fileUpload/image', formData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  try {
    if (response.status === 500) {
      throw new Error('error code 500');
    }

    if (response.status === 201) {
      const data = response.data;
      for (let i = 0; i < data.data.length; i++) {
        imageURLs.push(data.data[i].fileUrl);
      }
      return imageURLs;
    }
  } catch (error) {
    return error.message;
  }
};

export default uploadImage;
