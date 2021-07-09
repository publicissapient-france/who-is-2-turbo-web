import React, { ChangeEvent, useEffect, useState } from "react";
import { Metadata } from "../Metadata/Metadata";
import { Toolbar } from "../Toolbar/Toolbar";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import ProfileImageAdd from "../../images/profile-image-add.svg";
import { getProfile, postProfile } from "../../services/profile";
import { Loading } from "../Loading/Loading";
import ProfileImageChange from "../../images/profile-image-change.png";

interface UiProfile {
  firstName: string
  firstNameError?: boolean
  lastName: string
  lastNameError?: boolean
  gender: string
  preview?: string
  pictureError?: boolean
  picture?: string
  loading: boolean,
  updated: boolean,
}

export const Profile = () => {
  const [uiProfile, setUiProfile] = useState<UiProfile>({
    firstName: '',
    lastName: '',
    gender: 'FEMALE',
    loading: true,
    updated: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setUiProfile({
        ...await getProfile(),
        firstNameError: false,
        lastNameError: false,
        pictureError: false,
        loading: false,
        updated: false,
      });
    }
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
      })
      await postProfile({
        firstName: uiProfile.firstName,
        lastName: uiProfile.lastName,
        gender: uiProfile.gender,
        picture: uiProfile.picture,
      });
      setUiProfile({
        ...uiProfile,
        loading: false,
        updated: true,
      })
    } else {
      setUiProfile({ ...uiProfile, firstNameError, lastNameError, pictureError })
    }
  }

  const onFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, firstName: event.target.value, firstNameError: false });

  const onLastnameChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, lastName: event.target.value, lastNameError: false });

  const onGenderChange = (event: ChangeEvent<HTMLInputElement>) => setUiProfile({ ...uiProfile, gender: event.target.value });

  const loadImageFromFileSystem = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      checkPictureRatioIs4_3(file, URL.createObjectURL(file))
    }
  }

  const checkPictureRatioIs4_3 = (rawPicture: File, objectUrl: string) => {
    const image = document.createElement("img");
    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const ratio4_3 = height / width > 1.33 && height / width < 1.34;
      if (ratio4_3) {
        encodeImageToBase64Webp(objectUrl);
      } else {
        setUiProfile({
          ...uiProfile,
          pictureError: true
        })
      }
    }
    image.src = objectUrl;
  }

  const encodeImageToBase64Webp = async (objectUrl: string) => {
    const image: HTMLImageElement = await new Promise((resolve) => {
      const rawImage = new Image();
      rawImage.addEventListener('load', () => resolve(rawImage));
      rawImage.src = objectUrl;
    });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      setUiProfile({
        ...uiProfile,
        preview: objectUrl,
        picture: canvas.toDataURL('image/webp')
      });
    }
  }

  const updatedBanner = <div className="bg-[#6FCF97] font-game text-white text-center text-xs px-4 py-3 absolute z-10">Profile updated successfully!</div>;

  return (
    <main className="mb-4 lg:mb-12 h-screen">
      <Metadata/>
      {!uiProfile.loading ? <>
        <Toolbar title="Profile" buttonLabel="Back"/>
        {uiProfile.updated && updatedBanner}
        <section className="flex flex-col container mx-auto text-center justify-center items-center mt-8">
          <label htmlFor="load-picture">
            {uiProfile.preview || uiProfile.picture ?
              <div className="relative w-[142px]">
                <img className="invisible w-full"
                     src={ProfileImageChange}
                     alt="user's background"/>
                <img className="absolute inset-0 w-full mt-3"
                     src={uiProfile.preview || uiProfile.picture}
                     alt="user's picture"/>
                <img className="absolute inset-0 w-full"
                     src={ProfileImageChange}
                     alt="user's background"/>
              </div> :
              <img src={ProfileImageAdd} alt="add an image caption"/>}
          </label>
          {uiProfile.pictureError &&
          <p className="mx-auto text-left max-w-sm text-red-500 text-xs leading-tight mt-2">
            Picture should have ratio 4/3.
          </p>}
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
