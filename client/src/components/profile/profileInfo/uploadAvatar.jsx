import React from "react";
import {Upload, Button} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export const UploadAvatar = () => {
  const props = {


    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
        headers: {
          'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        },
        method: 'POST',
        body: file,
      })
        .then(res => res.json())
        .then(({thumbnail}) => thumbnail);
    },
  };
  return <Upload {...props}>
    <Button icon={<UploadOutlined/>}>Upload</Button>
  </Upload>
}