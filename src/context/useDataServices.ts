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

  const setJson = async (data: Object) => {


    try {
      await mySky.setJSON(filePath, {
        data: JSON.stringify(data),
      });

      return { done: true };
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