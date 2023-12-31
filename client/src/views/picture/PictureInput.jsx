import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import {
    InputLabel, FormControl
} from "@mui/material";

//ant d
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Image, Modal } from 'antd';
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";

const PictureInput = ({ inputValue, imageURLs }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {

            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };


    const handleDeletePic = (e) => {
        e.preventdefault()
        console.log('444');
    }
    const handlePages = (e) => {

    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { width: '100%', pt: 1 },
            }}
            noValidate
            autoComplete="off"
            onPaste={handlePages}
            style={{ marginTop: "10px" }}
        >

            {/* <TextField type='file' name='file' inputProps={{ accept: 'image/*' }} onChange={inputValue("file")} /> */}

            {/* {imageURLs && (
                imageURLs.map((imageSrc, idx) => (

                    <>
                        <div>
                            <InputGroup className="mt-3" >
                                <InputGroup.Text
                                    className=""
                                    style={{
                                        fontSize: "18px",
                                        fontFamily: "Times New Roman",
                                        height: "2.5rem",
                                    }}
                                >
                                    ตัวอย่างรูปภาพ
                                </InputGroup.Text>
                                <div style={{ display: 'block', margin: 'center', marginLeft: '20px' }} >
                                    <Image key={idx} width={50} src={imageSrc} />
                                </div>
                            </InputGroup >
                        </div>

                    </>

                ))
            )} */}

            <Upload.Dragger
                {...props}
                accept='image/*'
                maxCount={1}
                listType='picture-card'
                beforeUpload={(file) => {
                    inputValue("file")({ target: { name: 'file', files: [file] } });
                    return false; // Prevent default upload behavior
                }}
                progress={{
                    strokeWidth: 3,
                    strokeColor: { '0%': '#f0f', '100%': '#ff0' },
                    // style: { top: 12 }
                }}
                onPreview={handlePreview}
            >
                <Button icon={<UploadOutlined />}>อัปโหลดรูปภาพ</Button>
            </Upload.Dragger>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>

        </Box >
    )
}

export default PictureInput