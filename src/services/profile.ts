import axios from "axios";

export interface ProfileEntity {
  firstName: string
  lastName: string
  gender: string
  picture?: string
}

export const getProfile: () => Promise<ProfileEntity> = async () => {
  const { data } = await axios.get<ProfileEntity>('/members/me');
  return data;
};

export const postProfile: (profile: ProfileEntity) => Promise<ProfileEntity> = async (profile: ProfileEntity) =>
  await axios.post('/members/me', profile);
