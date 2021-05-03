import useSkyStatus from './useSkyStatus';
import { useAppContext } from './index';

const withStringCheck = (fn: Function) => {
  return (path: any) => {
    if (!path) {
      return {
        error: `no path provided ${path}`
      }
    }
    return fn(path);
  }
}

const useDataServices = (filePath: string) => {

  const { mySky } = useSkyStatus();
  const { state } = useAppContext();
  const setJson = async (input: Object) => {


    try {
      const { data, skylink } = await mySky.setJSON(`${state.domain}/${filePath}`, {
        data: JSON.stringify(input),
      });

      return {
        done: true,
        data,
        skylink
      };
    } catch (error) {
      console.error(`Unable to setJSON: ${error.message}`);
      return {
        error,
      }
    }
  };

  const getJson = async () => {
    try {
      const { data } = await mySky.getJSON(`${state.domain}/${filePath}`);

      return {
        data: data
      };
    } catch (error) {
      console.error(`Unable to get the json data ${error}`);
      return {
        error,
      }
    }
  };

  return {
    getJson: withStringCheck(getJson),
    setJson: withStringCheck(setJson),
  }

}

export default useDataServices;