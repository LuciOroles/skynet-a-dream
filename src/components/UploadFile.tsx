import React, { ChangeEvent, useState, useEffect } from 'react';
import useSkyStatus from '../context/useSkyStatus';

const UploadFile = () => {
  const { client } = useSkyStatus();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [skyLink, setskyLink] = useState<string>('');
  const [Loading, setLoading] = useState<boolean>(false);

  const handleNewContent = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const { skylink } = await client.uploadFile(file);
      const skylinkUrl = await client.getSkylinkUrl(skylink);
      setskyLink(skylinkUrl);
      setLoading(false);
      setFile(null);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (fileInputRef.current && skyLink) {
      fileInputRef.current.value = '';
      setskyLink('');
    }
  }, [fileInputRef, skyLink]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const t = fileList ? fileList[0] : null;
    if (t) setFile(t);
  };
  return (
    <React.Fragment>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        disabled={Loading}
      />

      <button
        type="button"
        onClick={handleNewContent}
        disabled={!file || Loading}
      >
        new content
      </button>
    </React.Fragment>
  );
};

export default UploadFile;
