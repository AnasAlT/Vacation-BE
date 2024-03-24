// This function is used to generate the Access token and can be used in the sign up and log in.
async function loginUser(email, password) {
    const response = await fetch('http://4.223.160.231:8080/api/um/v1/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: email,
            password: password,
        })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.message || 'Response error!');
    }
    
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }

    return data;
}
 
export { loginUser };  