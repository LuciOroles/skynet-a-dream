import React, { ChangeEvent, useState } from 'react';
import AccessOtherUser from './AccessOtherUser';
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
      const r = await mySky.setJSON(filePath, {
        name,
      });

      console.log(r);
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
  };

  const getJson = async () => {
    try {
      const { data } = await mySky.getJSON(filePath);
      console.log(data);
      debugger;
    } catch (error) {
      console.error(`Unable to get the json data ${error}`);
    }
  };

  return (
    <div>
      <div>
        <h3>Get data for my ID</h3>
        <div>
          <label>
            filePath:
            <input type="text" value={filePath} onChange={setFile} />
          </label>
          <label>
            name field:
            <input type="text" value={name} onChange={setName} />
          </label>
          <div>
            <button
              type="button"
              disabled={!filePath || !name}
              onClick={setJson}
            >
              updateJSON
            </button>

            <button type="button" onClick={getJson} disabled={!filePath}>
              getJSON
            </button>
          </div>
        </div>
      </div>
      <AccessOtherUser />
    </div>
  );
};

export default AccessDB;
