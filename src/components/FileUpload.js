import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';
import { Image } from  'semantic-ui-react';

import { FILE_UPLOAD } from '../utils/graphql';

function FileUpload({imagePath, uploadCallBack}) {

  const [imageUrl, setImageUrl] = useState(imagePath);

    const [uploadFile] = useMutation(FILE_UPLOAD, {
      update: (cache, {data}) => {
        setImageUrl("http://localhost:4000/" + data.uploadFile.path);
        uploadCallBack(data.uploadFile);
      }
    });

    const onDrop = useCallback(
      (acceptedFiles) => {
        const file = acceptedFiles[0];
        // Do something with the files
        uploadFile({
          variables: { file }
        });
      },
      [uploadFile]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });
  
    return (
      <>
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive && 'isActive'}`}
          style={{height:250,margin:15}}
        >
          <input {...getInputProps()} />
          {imageUrl && imageUrl.trim()!='' ? (
            <Image size="medium" src={imageUrl} style={{boder:2}}/>
          ) : (
            <p>Drag image or click to upload image</p>
          )}
        </div>
      </>
    );
  };

  export default FileUpload;