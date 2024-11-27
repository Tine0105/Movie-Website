const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/', // Base URL của API
    apiKey: '49473325693fa516e4f1b33a5666f19e', // API Key để xác thực
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`, // Đường dẫn cho ảnh kích thước gốc
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`, // Đường dẫn cho ảnh kích thước w500
};

export default apiConfig;
