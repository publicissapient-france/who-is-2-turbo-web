import React, { ChangeEvent, useEffect, useState } from 'react';
import { Metadata } from '../Metadata/Metadata';
import { Toolbar } from '../Toolbar/Toolbar';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import ProfileImageAdd from '../../images/profile-image-add.svg';
import { Capability, getProfile, ProfileEntity, setProfile, setProfileCompleted } from '../../services/profile';
import { Loading } from '../Loading/Loading';
import ProfileImageChange from '../../images/profile-image-change.png';
import { Message } from '../Message/Message';
import { Radio } from '../Radio/Radio';
import { Select } from '../Select/Select';

interface UiProfile extends ProfileEntity {
  firstNameError?: boolean;
  lastNameError?: boolean;
  preview?: string;
  loading: boolean;
  updated: boolean;
  isNewUser: boolean;
  capability?: string;
  month: number;
  year: number;
}

export const Profile = () => {
  const now = new Date();
  const [uiProfile, setUiProfile] = useState<UiProfile>({
    firstName: '',
    lastName: '',
    gender: 'FEMALE',
    loading: true,
    updated: false,
    isNewUser: false,
    month: now.getMonth(),
    year: now.getFullYear(),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileEntity = await getProfile();
        setUiProfile({
          ...profileEntity,
          firstNameError: false,
          lastNameError: false,
          loading: false,
          updated: false,
          isNewUser: false,
          month: profileEntity.arrivalDate ? new Date(profileEntity.arrivalDate).getMonth() : now.getMonth(),
          year: profileEntity.arrivalDate ? new Date(profileEntity.arrivalDate).getFullYear() : now.getFullYear(),
        });
        setProfileCompleted();
      } catch (error) {
        const unknownUser = error && error.response && error.response.status === 404;
        if (unknownUser) {
          setUiProfile({
            firstName: '',
            lastName: '',
            gender: 'FEMALE',
            firstNameError: false,
            lastNameError: false,
            loading: false,
            updated: false,
            isNewUser: true,
            month: now.getMonth(),
            year: now.getFullYear(),
          });
        }
      }
    };
    fetchProfile();
  }, []);

  const updateProfile = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    let firstNameError = false;
    let lastNameError = false;
    let pictureError = false;
    if (uiProfile.firstName.length < 1) {
      firstNameError = true;
    }
    if (uiProfile.lastName.length < 1) {
      lastNameError = true;
    }
    if (!uiProfile.picture) {
      pictureError = true;
    }
    if (!firstNameError && !lastNameError && !pictureError) {
      setUiProfile({
        ...uiProfile,
        loading: true,
      });
      await setProfile(uiProfile.isNewUser, {
        firstName: uiProfile.firstName,
        lastName: uiProfile.lastName,
        gender: uiProfile.gender,
        picture: uiProfile.picture,
        capability: uiProfile.capability,
        arrivalDate: new Date(uiProfile.year, uiProfile.month),
      });
      setUiProfile({
        ...uiProfile,
        loading: false,
        updated: true,
        isNewUser: false,
      });
      setProfileCompleted();
    } else {
      setUiProfile({ ...uiProfile, firstNameError, lastNameError });
    }
  };

  const onFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, firstName: event.target.value, firstNameError: false });

  const onLastnameChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, lastName: event.target.value, lastNameError: false });

  const onGenderChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, gender: getGender(event) });

  const onCapabilityChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, capability: event.target.value });

  const getGender = (event: React.ChangeEvent<HTMLInputElement>) => (event.target.value === 'MALE' ? 'MALE' : 'FEMALE');

  const loadImageFromFileSystem = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      checkPictureRatioIs4_3(file, URL.createObjectURL(file));
    }
  };

  const checkPictureRatioIs4_3 = (rawPicture: File, objectUrl: string) => {
    const image = document.createElement('img');
    image.onload = () => {
      cropAndEncodeImageToBase64Webp(objectUrl);
    };
    image.src = objectUrl;
  };

  const cropAndEncodeImageToBase64Webp = async (objectUrl: string) => {
    const image: HTMLImageElement = await new Promise((resolve) => {
      const rawImage = new Image();
      rawImage.addEventListener('load', () => resolve(rawImage));
      rawImage.src = objectUrl;
    });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if ((image.height * 3) / 4 > image.width) {
        canvas.height = (image.width * 4) / 3;
        canvas.width = image.width;
        ctx.drawImage(image, 0, (image.height - (image.width * 4) / 3) / 2, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      } else {
        canvas.height = image.height;
        canvas.width = (image.height * 3) / 4;
        ctx.drawImage(image, (image.width - (image.height * 3) / 4) / 2, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
      }
      setUiProfile({
        ...uiProfile,
        picture: canvas.toDataURL('image/webp'),
      });
    }
  };

  const updatedBanner = <div className="absolute z-10 w-full bg-green-3 px-4 py-3 text-center font-game text-txs text-blue-1">Profile updated successfully!</div>;

  const pastThirtyYears = () => {
    const year = new Date().getFullYear();
    const years = new Array(31);
    for (let y = year - 30; y <= year; y++) {
      years.push(y);
    }
    return years.reverse();
  };

  const months = ['january', 'february', 'march', 'april', 'mai', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  const onMonthChanged = (event: ChangeEvent<HTMLSelectElement>) =>
    setUiProfile({
      ...uiProfile,
      month: parseInt(event.target.value, 10),
    });

  const onYearChanged = (event: ChangeEvent<HTMLSelectElement>) =>
    setUiProfile({
      ...uiProfile,
      year: parseInt(event.target.value, 10),
    });

  // noinspection SuspiciousTypeOfGuard
  return (
    <main className="mb-4 lg:mb-12">
      <Metadata />
      {!uiProfile.loading ? (
        <>
          <Toolbar title="Profile" buttonLabel="Back" />
          {uiProfile.updated && updatedBanner}
          {uiProfile.isNewUser && (
            <section className="m-6 flex max-w-screen-sm md:mx-auto">
              <Message />
            </section>
          )}
          <section className="container mx-auto mt-8 flex max-w-screen-sm flex-col items-center justify-center">
            <label htmlFor="load-picture">
              {uiProfile.preview || uiProfile.picture ? (
                <div className="relative w-[142px]">
                  <img className="invisible w-full" src={ProfileImageChange} alt="user's background" />
                  <img className="absolute inset-0 mt-[2px] w-full p-[10px]" src={uiProfile.preview || uiProfile.picture} alt="user's picture" />
                  <img className="absolute inset-0 w-full" src={ProfileImageChange} alt="user's background" />
                </div>
              ) : (
                <img src={ProfileImageAdd} alt="add an image caption" />
              )}
            </label>
            <input id="load-picture" type="file" className="hidden" onChange={loadImageFromFileSystem} />
            <form action="" className="mt-8 flex w-full flex-col gap-4 px-6 md:px-0">
              <div className="text-white" onChange={onGenderChange}>
                <span className="text-sm">Gender</span>
                <div className="mt-2 flex flex-auto gap-x-4">
                  <div className="basis-1/2">
                    <Radio key="FEMALE" checked={uiProfile.gender === 'FEMALE'} name="gender" value="FEMALE" label="Female"></Radio>
                  </div>
                  <div className="basis-1/2">
                    <Radio key="MALE" checked={uiProfile.gender === 'MALE'} name="gender" value="MALE" label="Male"></Radio>
                  </div>
                </div>
              </div>
              <Input
                label="First name"
                wide
                name="firstName"
                value={uiProfile.firstName}
                autoComplete="given-name"
                placeholder="John"
                type="text"
                autoFocus={true}
                onChange={onFirstnameChange}
                errorMessage="Firstname should have at least one character."
                error={uiProfile.firstNameError}
              />
              <Input
                label="Last name"
                wide
                name="lastName"
                value={uiProfile.lastName}
                autoComplete="family-name"
                placeholder="Doe"
                type="text"
                autoFocus={false}
                onChange={onLastnameChange}
                errorMessage="Lastname should have at least one character."
                error={uiProfile.lastNameError}
              />
              <div className="flex flex-col gap-y-4 text-white" onChange={onCapabilityChange}>
                <span className="-mb-2 text-sm">
                  Select your capability (SPEED)
                </span>
                {Object.values(Capability)
                  .filter((value) => typeof value === 'string')
                  .map((value) => value.toString())
                  .map((value) => (
                    <Radio key={value} checked={uiProfile.capability === value} name="capability" value={value} label={`${value}`} />
                  ))}
              </div>
              <div className="mb-4 text-white">
                <span className="-mb-2 text-sm">
                  Arrival date
                </span>
                <div className="flex gap-x-4 pt-2 text-grey-3">
                  <Select onChange={onMonthChanged} name="arrivalMonth" value={`${uiProfile.month}`} options={months.map((label, index) => ({ label, value: index }))} />
                  <Select onChange={onYearChanged} name="arrivalYear" value={`${uiProfile.year}`} options={pastThirtyYears().map((y) => ({ value: y, label: y }))} />
                </div>
              </div>
              <div className="mt-6">
                <Button submit wide primary onClick={updateProfile}>
                  Save profile
                </Button>
              </div>
            </form>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};
