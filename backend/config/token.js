import jwt from 'jsonwebtoken';

const genToken = async (userID) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (err) {
        console.error("Token Generation Error:", err);
        throw err; // Re-throw the error to handle it in the caller
    }
};

export default genToken;