import jwt from 'jsonwebtoken';

const genToken = async (userID) => {
    try {
        const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "7d"})
        return token;
    } catch (err) {
        console.log(err)
    }
}

export default genToken;