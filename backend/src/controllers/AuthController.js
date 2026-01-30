const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

class AuthController {
    async register(req, res) {
        try {
            const { email, password, name, adminPassword } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
            }

            const user = await AuthService.register(email, password, name, adminPassword);

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email e senha são obrigatórios' });
            }

            const result = await AuthService.login(email, password);

            return res.json(result);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async verify(req, res) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ error: 'Token não fornecido' });
            }

            const token = authHeader.split(' ')[1];
            const user = await AuthService.verifyToken(token);

            return res.json({ valid: true, user });
        } catch (error) {
            return res.status(401).json({ error: error.message, valid: false });
        }
    }

    async count(req, res) {
        try {
            const count = await UserService.count();
            return res.json({ count });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
