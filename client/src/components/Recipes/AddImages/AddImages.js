import { useState } from 'react';

const AddImages = ({ sendImages, close }) => {
  const [files, setFiles] = useState(null);

  const send = (ev) => {
    ev.preventDefault();

    const filesData = new FormData();

    for (let i = 0; i < files.length; i++) {
      filesData.append('images', files[i]);
    }

    sendImages(filesData);
    close(false);
  };

  return (
    <form onSubmit={send}>
      <input
        type="file"
        multiple
        onChange={(ev) => setFiles(ev.target.files)}
      />
      <button disabled={!files}>Изпрати</button>
    </form>
  );
};

export default AddImages;
