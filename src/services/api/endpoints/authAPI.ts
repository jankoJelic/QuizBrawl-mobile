import httpClient from '../httpClient';

const { post, get } = httpClient;

export const authAPI = {
  registerUser: async (body: RegisterBody) => {
    const { data }: { data: string } = await post('auth/register', body);

    return data;
  },

  loginUser: async (body: { email: string; password: string }) => {
    const { data }: { data: string } = await post('auth/login', body);

    return data;
  },
};

interface RegisterBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
