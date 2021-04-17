import React, { ChangeEvent, useState } from 'react';
import AccessOtherUser from './AccessOtherUser';
import useDataServices from '../context/useDataServices';

const AccessDB = () => {
  const [filePath, setfilePath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setname] = useState<string>('');
  const { getJson, setJson } = useDataServices(filePath);

  const handleChange = (setChange: (a: string) => void) => (
    ev: ChangeEvent
  ) => {
    setChange((ev.target as HTMLInputElement).value);
  };
  const setFile = handleChange(setfilePath);
  const setName = handleChange(setname);

  const handleSetJson = async () => {
    setLoading(true);
    const result = await setJson(filePath);
    setLoading(false);

    console.log(result);
  };
  const handleGetJson = async () => {
    setLoading(true);
    const d = await getJson(filePath);
    console.log(d);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <h3>Get data for my ID</h3>
        {loading && <div> Loading... </div>}
        {!loading && (
          <div className="data-container">
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
                onClick={handleSetJson}
              >
                Update JSON
              </button>

              <button
                type="button"
                onClick={handleGetJson}
                disabled={!filePath}
              >
                Get JSON
              </button>
            </div>
          </div>
        )}
      </div>

      <AccessOtherUser />
    </div>
  );
};

export default AccessDB;
