const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('./UserService');

class AuthService {
    /**
     * Register a new user
     * First user: no admin password required
     * Subsequent users: need admin password
     */
    async register(email, password, name, adminPassword) {
        // Check if user already exists
        const existingUser = await UserService.getByEmail(email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        // Count existing users
        const userCount = await UserService.count();

        // If not the first user, validate admin password
        if (userCount > 0) {
            if (!adminPassword) {
                throw new Error('Senha de administrador necessária para cadastrar novos usuários');
            }

            // Verify admin password against any existing user
            const users = await UserService.getAll();
            const validAdmin = await this._verifyAdminPassword(users, adminPassword);

            if (!validAdmin) {
                throw new Error('Senha de administrador inválida');
            }
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = await UserService.create({
            email,
            passwordHash,
            name
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    }

    /**
     * Login user
     */
    async login(email, password) {
        const user = await UserService.getByEmail(email);

        if (!user) {
            throw new Error('Email ou senha inválidos');
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
            throw new Error('Email ou senha inválidos');
        }

        // Generate JWT token (30 minutes)
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key-change-in-production',
            { expiresIn: '30m' }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }

    /**
     * Verify JWT token
     */
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your-secret-key-change-in-production'
            );

            const user = await UserService.getById(decoded.id);

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            return {
                id: user.id,
                email: user.email,
                name: user.name
            };
        } catch (error) {
            throw new Error('Token inválido ou expirado');
        }
    }

    /**
     * Helper: Verify admin password against existing users
     */
    async _verifyAdminPassword(users, adminPassword) {
        for (const user of users) {
            const fullUser = await UserService.getByEmail(user.email);
            const isValid = await bcrypt.compare(adminPassword, fullUser.passwordHash);
            if (isValid) {
                return true;
            }
        }
        return false;
    }
}

module.exports = new AuthService();
