import useSkyStatus from './useSkyStatus';


const withStringCheck = (fn: Function) => {
  return (path: string) => {
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

  const setJson = async (input: Object) => {


    try {
      const { data, skylink } = await mySky.setJSON(filePath, {
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
      const { data } = await mySky.getJSON(filePath);
      debugger;
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