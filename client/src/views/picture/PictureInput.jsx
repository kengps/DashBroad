import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';


//ant d
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';


const PictureInput = ({ handleUploadImage, inputValue }) => {

    const props = {
        name: 'file',
        action: import.meta.env.VITE_REACT_APP_API,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
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

            <TextField type='file' name='file' onChange={inputValue("file")} />


            {/* <Upload.Dragger
                multiple
                listType='picture'
                beforeUpload={(file) => {
                    console.log(file);
                    return false
                }}
                {...props}>

                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload.Dragger> */}
        </Box>
    )
}

export default PictureInput