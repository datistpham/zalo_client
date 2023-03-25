import axios from "axios";
import { SERVER_URL } from "../config/config";
import { uploadImageClient } from "../firebase/config";
import Cookies from "js-cookie";
import validUrl from "valid-url";

const update_info_user = async (
  id,
  newUsername,
  newProfilePicture,
  newGender,
  setMessage,
  setData,
  changeAvatar,
  newCoverPhoto,
  changeCoverPhoto
) => {

  const urlAvatar = await uploadImageClient(newProfilePicture);
  const urlCover = await uploadImageClient(newCoverPhoto);

  if (validUrl.isUri(urlAvatar) === true) {
    if (validUrl.isUri(urlCover) === true) {
      console.log(1);
      const res = await axios({
        url: `${SERVER_URL}/api/users/edit-infor/${id}`,
        method: "post",
        headers: {
          authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        data: {
          newUsername: newUsername,
          newProfilePicture: urlAvatar,
          newGender,
          newCoverPhoto: urlCover || "",
        },
      });
      const result = await res.data;
      setData(result?.user);
      return setMessage(result);
    } else {
      console.log(2);
      const res = await axios({
        url: `${SERVER_URL}/api/users/edit-infor/${id}`,
        method: "post",
        headers: {
          authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        data: {
          newUsername: newUsername,
          newGender,
          newProfilePicture: urlAvatar,
          newCoverPhoto: newCoverPhoto || "",
        },
      });
      const result = await res.data;
      setData(result?.user);
      return setMessage(result);
    }
  } else {
    if (validUrl.isUri(urlCover) === true) {
      const res = await axios({
        url: `${SERVER_URL}/api/users/edit-infor/${id}`,
        method: "post",
        headers: {
          authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        data: {
          newUsername: newUsername,
          newProfilePicture,
          newGender,
          newCoverPhoto: urlCover,
        },
      });
      const result = await res.data;
      setData(result?.user);
      return setMessage(result);
    } else {
      if(changeCoverPhoto=== true ){
          const res = await axios({
            url: `${SERVER_URL}/api/users/edit-infor/${id}`,
            method: "post",
            headers: {
              authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            data: {
              newUsername: newUsername,
              newProfilePicture,
              newGender,
              newCoverPhoto: urlCover,
            },
          });
          const result = await res.data;
          setData(result?.user);
          return setMessage(result);

      }
      else {
        const res = await axios({
            url: `${SERVER_URL}/api/users/edit-infor/${id}`,
            method: "post",
            headers: {
              authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
            data: {
              newUsername: newUsername,
              newProfilePicture,
              newGender,
              newCoverPhoto: newCoverPhoto,
            },
          });
          const result = await res.data;
          setData(result?.user);
          return setMessage(result);
      }
    }
  }
};

export default update_info_user;
