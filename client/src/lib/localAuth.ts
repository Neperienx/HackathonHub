interface LocalUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthResult {
  success: boolean;
  user?: LocalUser;
  error?: string;
}

export class LocalAuthService {
  private static USERS_KEY = 'hackathon_users';
  private static CURRENT_USER_KEY = 'hackathon_current_user';

  static getUsers(): LocalUser[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: LocalUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static getCurrentUser(): LocalUser | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: LocalUser | null): void {
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  static signUp(email: string, password: string, name: string): AuthResult {
    const users = this.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'User already exists with this email' };
    }

    // Create new user
    const newUser: LocalUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  static signIn(email: string, password: string): AuthResult {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'No account found with this email' };
    }

    this.setCurrentUser(user);
    return { success: true, user };
  }

  static signOut(): void {
    this.setCurrentUser(null);
  }

  static deleteAccount(userId: string): void {
    const users = this.getUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    this.saveUsers(updatedUsers);
    this.setCurrentUser(null);
  }
}