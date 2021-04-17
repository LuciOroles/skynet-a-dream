import { useState, useEffect, useCallback } from 'react';
import { SkynetClient } from 'skynet-js';
import { ContentRecordDAC } from '@skynetlabs/content-record-library';

const client = new SkynetClient('https://siasky.net/');
const hostApp = 'localhost';

const useSkyStatus = () => {
  const [mySky, setInstance] = useState<any>(undefined);
  const initMySky = useCallback(async () => {
    try {
      const mySky = await client.loadMySky(hostApp, { dev: true });
      const dac = new ContentRecordDAC();
      await mySky.loadDacs(dac);
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
    // contentRecord,
  };
};

export default useSkyStatus;
