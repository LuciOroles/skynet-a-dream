import { Permission, PermCategory, PermType, SkynetClient } from "skynet-js";

const client = new SkynetClient();

async function addPermissionsExample(path: string) {
    try {
        const mySky = await client.loadMySky();

        // Add additional needed permissions before checkLogin.
        // Can be Permissions object or list of Permissions objects
        await mySky.addPermissions(new Permission("localhost", `localhost/${path}`, PermCategory.Hidden, PermType.Write));

        debugger;
    } catch (error) {
        console.log(error)
    }
}


export default addPermissionsExample;