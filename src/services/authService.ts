interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

class AuthService {
  //private readonly API_BASE_URL = 'http://localhost:8080'; // Ajuste conforme necessário
   private readonly API_BASE_URL = 'https://silvadevbrmaster.rf.gd';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: credentials.email,
      password: credentials.password
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${this.API_BASE_URL}/api/auth/login`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Erro na autenticação: ${response.status}`);
      }

      const result: AuthResponse = await response.json();
      
      // Armazena o token e dados do usuário no localStorage
      this.setToken(result.token);
      if (result.user) {
        this.setUser(result.user);
      }

      return result;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();