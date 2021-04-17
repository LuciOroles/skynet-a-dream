import React, { ChangeEvent, useState } from 'react';
import useSkyStatus from '../context/useSkyStatus';

interface HandleChanges {
  (ev: ChangeEvent): void;
}

const AccessOther = () => {
  const [secondUser, setSecondUser] = useState<string>('');
  const [filePath, setfilePath] = useState<string>('');
  const { client } = useSkyStatus();

  const setSecondUserName: HandleChanges = (ev: ChangeEvent) => {
    setSecondUser((ev.target as HTMLInputElement).value);
  };
  const setFile: HandleChanges = (ev) => {
    setfilePath((ev.target as HTMLInputElement).value);
  };

  const getForSecondUser = async () => {
    try {
      const { data } = await client.file.getJSON(secondUser, filePath);
      console.log(data);
      debugger;
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetUser = () => {
    getForSecondUser();
  };

  return (
    <div>
      <h3>Get data for another ID</h3>
      <label>
        filePath:
        <input type="text" value={filePath} onChange={setFile} />
      </label>
      <label>
        id:
        <input type="text" value={secondUser} onChange={setSecondUserName} />
      </label>
      <button
        type="button"
        onClick={handleGetUser}
        disabled={!secondUser || !filePath}
      >
        Get data
      </button>
    </div>
  );
};

export default AccessOther;
