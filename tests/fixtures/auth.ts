const mockUser = {
    username: 'testuser',
    password: 'password123'
};

const mockApiResponse = {
    success: true,
    token: 'fake-jwt-token'
};

const simulateLogin = (user) => {
    if (user.username === mockUser.username && user.password === mockUser.password) {
        return mockApiResponse;
    }
    return { success: false, message: 'Invalid credentials' };
};

export { mockUser, mockApiResponse, simulateLogin };