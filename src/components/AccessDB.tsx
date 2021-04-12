import React, { ChangeEvent, useState } from 'react';
import useSkyStatus from '../context/useSkyStatus';

const AccessDB = () => {
  const [filePath, setfilePath] = useState<string>('');
  const [name, setname] = useState<string>('');
  const { mySky } = useSkyStatus();
  const handleChange = (setChange: (a: string) => void) => (
    ev: ChangeEvent
  ) => {
    setChange((ev.target as HTMLInputElement).value);
  };
  const setFile = handleChange(setfilePath);
  const setName = handleChange(setname);
  const setJson = async () => {
    try {
      console.log('filePath', filePath);
      await mySky.setJSON(filePath, {
        name,
      });
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
  };

  const getJson = async () => {
    try {
      const { data } = await mySky.getJSON(filePath);
      console.log(data);
      debugger;
    } catch (error) {}
  };

  return (
    <div>
      filePath:
      <input type="text" value={filePath} onChange={setFile} />
      json name:
      <input type="text" value={name} onChange={setName} />
      <div>
        <button type="button" disabled={!filePath || !name} onClick={setJson}>
          updateJSON
        </button>

        <button type="button" onClick={getJson}>
          getJSON
        </button>
      </div>
    </div>
  );
};

export default AccessDB;
