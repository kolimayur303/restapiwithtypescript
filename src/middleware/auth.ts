const jwt = require("jsonwebtoken");

const secret_key = "idwjeifjw8[fw8qjwdiw";

const auth = (req: { headers: { authorization: any; }; user_id: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            let user = jwt.verify(token, secret_key);
            req.user_id = user.user_id;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized user" });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized user" });
    }
}

module.exports = auth;
