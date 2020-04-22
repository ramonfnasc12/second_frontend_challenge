import React, { ReactNode } from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onUpload: Function;
  uploaded: boolean;
}

const Upload: React.FC<UploadProps> = ({ onUpload, uploaded }: UploadProps) => {
  function renderDragMessage(
    isDragActive: boolean,
    isDragReject: boolean,
  ): ReactNode {
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <>
      <Dropzone
        accept="text/csv"
        onDropAccepted={files => onUpload(files)}
        disabled={uploaded}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            uploaded={uploaded}
          >
            <input {...getInputProps()} data-testid="upload" />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
