import { Client, Account,ID, Avatars, Databases } from 'react-native-appwrite';


export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform:"com.steven.aora",
    projectId:"67763354003a7855acca",
    databaseId:"677634fc000e85784d8d",
    userCollectionId:"6776353200278bfc8d4c",
    videoCollectionId:"677635eb00098b77e471",
    storageId:"677638d20019aa3d79ce"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
 try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
    )
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    // after signup, perform sign in
    await signIn(email,password);

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
    )
    return newUser;
 } catch (error) {
    console.log(error);
    throw new Error(error)
 }
}

export async function signIn(email,password) {
    try {
        const session = await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}
