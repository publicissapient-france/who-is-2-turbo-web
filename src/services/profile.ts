import axios, { AxiosResponse } from 'axios';

export interface ProfileEntity {
  firstName: string;
  lastName: string;
  gender: 'FEMALE' | 'MALE';
  capability?: string;
  picture?: string;
  arrivalDate?: Date;
}

export enum Capability {
  STRATEGY = 1,
  PRODUCT,
  ENGINEERING,
  EXPERIENCE,
  DATA,
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

const PROFILE_COMPLETED_KEY = 'profileCompleted';

export const setProfileCompleted = () => localStorage.setItem(PROFILE_COMPLETED_KEY, 'y');

export const isProfileCompleted = () => localStorage.getItem(PROFILE_COMPLETED_KEY) != null;
