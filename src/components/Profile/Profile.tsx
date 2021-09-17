import React, { ChangeEvent, useEffect, useState } from "react";
import { Metadata } from "../Metadata/Metadata";
import { Toolbar } from "../Toolbar/Toolbar";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import ProfileImageAdd from "../../images/profile-image-add.svg";
import { getProfile, ProfileEntity, setProfile } from "../../services/profile";
import { Loading } from "../Loading/Loading";
import ProfileImageChange from "../../images/profile-image-change.png";
import { Message } from "../Message/Message";

interface UiProfile extends ProfileEntity {
  firstNameError?: boolean
  lastNameError?: boolean
  preview?: string
  loading: boolean
  updated: boolean
  isNewUser: boolean
}

export const Profile = () => {
  const [uiProfile, setUiProfile] = useState<UiProfile>({
    firstName: '',
    lastName: '',
    gender: 'FEMALE',
    loading: true,
    updated: false,
    isNewUser: false,
  });

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          setUiProfile({
            ...await getProfile(),
            firstNameError: false,
            lastNameError: false,
            loading: false,
            updated: false,
            isNewUser: false,
          });
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
            });
          }
        }
      }
      fetchProfile();
    }, []
  );

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
      })
      await setProfile(
        uiProfile.isNewUser,
        {
          firstName: uiProfile.firstName,
          lastName: uiProfile.lastName,
          gender: uiProfile.gender,
          picture: uiProfile.picture,
        });
      setUiProfile({
        ...uiProfile,
        loading: false,
        updated: true,
        isNewUser: false,
      })
    } else {
      setUiProfile({ ...uiProfile, firstNameError, lastNameError })
    }
  }

  const onFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, firstName: event.target.value, firstNameError: false });

  const onLastnameChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, lastName: event.target.value, lastNameError: false });

  const onGenderChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, gender: getGender(event) });

  const getGender = (event: React.ChangeEvent<HTMLInputElement>) => event.target.value === 'MALE' ? 'MALE' : 'FEMALE';

  const loadImageFromFileSystem = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      checkPictureRatioIs4_3(file, URL.createObjectURL(file))
    }
  }

  const checkPictureRatioIs4_3 = (rawPicture: File, objectUrl: string) => {
    const image = document.createElement("img");
    image.onload = () => {
      cropAndEncodeImageToBase64Webp(objectUrl);
    }
    image.src = objectUrl;
  }

  const cropAndEncodeImageToBase64Webp = async (objectUrl: string) => {
    const image: HTMLImageElement = await new Promise((resolve) => {
      const rawImage = new Image();
      rawImage.addEventListener('load', () => resolve(rawImage));
      rawImage.src = objectUrl;
    });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (image.height * 3 / 4 > image.width) {
        canvas.height = image.width * 4 / 3;
        canvas.width = image.width;
        ctx.drawImage(image,
          0, (image.height - image.width * 4 / 3) / 2,
          canvas.width, canvas.height,
          0, 0,
          canvas.width, canvas.height
        );
      } else {
        canvas.height = image.height;
        canvas.width = image.height * 3 / 4;
        ctx.drawImage(image,
          (image.width - image.height * 3 / 4) / 2, 0,
          canvas.width, canvas.height,
          0, 0,
          canvas.width, canvas.height
        );
      }
      setUiProfile({
        ...uiProfile,
        picture: canvas.toDataURL('image/webp')
      });
    }
  }

  const updatedBanner = <div className="w-full bg-[#6FCF97] font-game text-white text-center text-xs px-4 py-3 absolute z-10">Profile updated successfully!</div>;

  return (
    <main className="mb-4 lg:mb-12 h-screen">
      <Metadata/>
      {!uiProfile.loading ? <>
        <Toolbar title="Profile" buttonLabel="Back"/>
        {uiProfile.updated && updatedBanner}
        <section className="my-6 flex justify-center">
          <Message/>
        </section>
        <section className="flex flex-col container mx-auto text-center justify-center items-center mt-8">
          <label htmlFor="load-picture">
            {uiProfile.preview || uiProfile.picture ?
              <div className="relative w-[142px]">
                <img className="invisible w-full"
                     src={ProfileImageChange}
                     alt="user's background"/>
                <img className="absolute inset-0 w-full p-[10px] mt-[2px]"
                     src={uiProfile.preview || uiProfile.picture}
                     alt="user's picture"/>
                <img className="absolute inset-0 w-full"
                     src={ProfileImageChange}
                     alt="user's background"/>
              </div> :
              <img src={ProfileImageAdd} alt="add an image caption"/>}
          </label>
          <input
            id="load-picture"
            type="file"
            className="hidden"
            onChange={loadImageFromFileSystem}
          />
          <form action="" className="flex flex-col gap-4 mt-8">
            <div className="grid grid-cols-2 text-white" onChange={onGenderChange}>
              <label>
                <input type="radio" name="gender" value="FEMALE" defaultChecked={uiProfile.gender === 'FEMALE'}/>
                <span className="ml-2">Female</span>
              </label>
              <label>
                <input type="radio" name="gender" value="MALE" defaultChecked={uiProfile.gender === 'MALE'}/>
                <span className="ml-2">Male</span>
              </label>
            </div>
            <div>
              <Input value={uiProfile.firstName} autoComplete="given-name" placeholder="John" type="text" autoFocus={true} onChange={onFirstnameChange}/>
              {uiProfile.firstNameError &&
              <p className="mx-auto text-left max-w-sm text-red-500 text-xs leading-tight mt-2">
                Firstname should have length above 1.
              </p>}
            </div>
            <div>
              <Input value={uiProfile.lastName} autoComplete="family-name" placeholder="Doe" type="text" autoFocus={false} onChange={onLastnameChange}/>
              {uiProfile.lastNameError &&
              <p className="mx-auto text-left max-w-sm text-red-500 text-xs leading-tight mt-2">
                Lastname should have length above 1.
              </p>}
            </div>
            <div>
              <Button submit onClick={updateProfile}>Save profile</Button>
            </div>
          </form>
        </section>
      </> : <Loading/>}
    </main>
  )
}
