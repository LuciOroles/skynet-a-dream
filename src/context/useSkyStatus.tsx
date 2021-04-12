import { useState, useEffect, useCallback } from 'react';
import { SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from '@skynethq/content-record-library';
const contentRecord = new ContentRecordDAC();

const client = new SkynetClient('https://siasky.net/');
const dataDomain = 'localhost';

const useSkyStatus = () => {
  const [mySky, setInstance] = useState<any>(undefined);
  const initMySky = useCallback(async () => {
    try {
      const mySky = await client.loadMySky(dataDomain);
      await mySky.loadDacs(contentRecord);

      setInstance(mySky);
    } catch (error) {
      console.error(error);
    }
  }, [setInstance]);

  useEffect(() => {
    initMySky();
    return () => {};
  }, [initMySky]);

  return {
    client,
    mySky,
    contentRecord,
  };
};

export default useSkyStatus;
