import React, { ChangeEvent, useState } from 'react';
import AccessOtherUser from './AccessOtherUser';
import useDataServices from '../context/useDataServices';

const AccessDB = () => {
  const [filePath, setfilePath] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [jsonObj, setJsonObj] = useState<string>('');
  const { getJson, setJson } = useDataServices(filePath);

  const handleChange = (setChange: (a: string) => void) => (
    ev: ChangeEvent
  ) => {
    setChange((ev.target as HTMLInputElement).value);
  };
  const setFile = handleChange(setfilePath);
  const setName = handleChange(setJsonObj);

  const handleSetJson = async () => {
    try {
      const parsedData = JSON.parse(jsonObj);
      setLoading(true);
      const result = await setJson(parsedData);
      setLoading(false);

      console.log(result);
    } catch (err) {
      console.log(`Unable to update ${err}`);
    }
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
            <div>
              <label>
                filePath:
                <input type="text" value={filePath} onChange={setFile} />
              </label>
            </div>
            <div>
              <label>
                Json value, add valid json:
                <textarea rows={3} value={jsonObj} onChange={setName} />
              </label>
            </div>
            <div>
              <button
                type="button"
                disabled={!filePath || !jsonObj}
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
