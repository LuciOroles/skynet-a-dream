import { useState, useEffect, useCallback } from 'react';
import { SkynetClient } from 'skynet-js';

const client = new SkynetClient('https://siasky.net/');
const dataDomain = 'localhost';

const useSkyStatus = () => {
  const [instance, setInstance] = useState<any>(undefined);
  const initMySky = useCallback(async () => {
    try {
      const mySky = await client.loadMySky(dataDomain);
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
    instance,
  };
};

export default useSkyStatus;
