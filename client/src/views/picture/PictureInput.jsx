import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';


//ant d
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Image } from 'antd';


const PictureInput = ({ inputValue, imageURLs }) => {
    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
         
            if (info.file.status !== 'uploading') {
                console.log('ไม่เท่ากับ uploading',info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log('เท่ากับ done');
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                console.log('= error');
            }
        },
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { width: '100%', pt: 1 },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField type='file' name='file' inputProps={{ accept: 'image/*' }} onChange={inputValue("file")} />

            {imageURLs && (
                imageURLs.map((imageSrc, idx) => (
                    <Image key={idx} width={50} src={imageSrc} style={{ display: 'block', margin: 'center' }} />

                ))
            )}
            {/* <Upload.Dragger
                {...props}
                accept='image/*'
                maxCount={1}
                listType='picture'
                beforeUpload={(file) => {
                    console.log('file', file);
                    return true
                }}
                progress={{
                    strokeWidth: 3,
                    strokeColor: { '0%': '#f0f', '100%': '#ff0' },
                    // style: { top: 12 }
                }}
               
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload.Dragger> */}

        </Box >
    )
}

export default PictureInput