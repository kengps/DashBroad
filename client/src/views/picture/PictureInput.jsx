import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';


//ant d
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Image } from 'antd';


const PictureInput = ({ inputValue, imageURLs }) => {


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

            {/* {imageURLs.map((imageSrc, idx) => (
                <Image key={idx} width={50} src={imageSrc} style={{ display: 'block', margin: 'center' }} />

            ))} */}

        </Box>
    )
}

export default PictureInput