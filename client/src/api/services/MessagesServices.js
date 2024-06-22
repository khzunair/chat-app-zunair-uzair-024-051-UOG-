import httpClient from "../http-comons";




const getMessages = (token,chatId) => {
    return httpClient.get(
        `/message/${chatId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
};




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




const exportedObject = {
    initializeChat,
    getMessages,
};



export default exportedObject;