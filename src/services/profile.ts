import axios, { AxiosResponse } from "axios";

export interface ProfileEntity {
  firstName: string
  lastName: string
  gender: 'FEMALE' | 'MALE'
  picture?: string
}

export const getProfile: () => Promise<ProfileEntity> = async () => {
  const { data } = await axios.get<ProfileEntity>('/members/me');
  return data;
};

export const setProfile: (isNewUser: boolean, profile: ProfileEntity) => Promise<AxiosResponse> = async (isNewUser: boolean, profile: ProfileEntity) =>
  await axios({
    method: isNewUser ? 'post' : 'put',
    url: '/members/me',
    data: profile,
  });
