import httpClient from "../http-comons";

// post Chat
const initializeChat = (credentials, token) => {
    return httpClient.post(
        '/chat',
        credentials,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
    );
};



const getChats = (token) => {
    return httpClient.get(
        '/chat',
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
};



const exportedObject = {
    initializeChat,
    getChats,
};



export default exportedObject;