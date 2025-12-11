const { APP_PORT, MONGO_URI } = process.env;
module.exports = {
    appPort: APP_PORT || 4000,
    mongoURI: MONGO_URI ||"mongodb+srv://muhammad:$ecretPass1@library.v1cau.mongodb.net/?retryWrites=true&w=majority&appName=library",
    // mongoURI: MONGO_URI ||"mongodb+srv://muhammad:$ecretPass1@library.v1cau.mongodb.net/?retryWrites=true&w=majority&appName=library",
}


// this is the new comment