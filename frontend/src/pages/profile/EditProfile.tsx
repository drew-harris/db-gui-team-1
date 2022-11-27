import {
  Avatar,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, saveProfileInformation } from "../../api/userInfo";
import { AuthContext } from "../../context/AuthContext";

export const EditProfilePage = () => {
  const { setUser, user } = useContext(AuthContext);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      bio: "",
      profilePicture: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserInfo(user.id);
      console.log(data.user);
      form.setValues({
        bio: data.user.bio || "",
        profilePicture: data.user.profileImageUrl || "",
      });
      setUserDataLoaded(true);
    };

    fetchData();
  }, []);

  const signOut = () => {
    window.localStorage.setItem("jwt", null);
    window.localStorage.setItem("user", null);
    setUser(null);
    navigate("/");
  };

  const submitProfileInfo = async (values) => {
    try {
      console.log("submitProfileInfo");
      await saveProfileInformation({
        bio: values.bio,
        profileImageUrl: values.profilePicture,
      });
      navigate("/profile/" + user.id);
    } catch (error) {
      showNotification({
        message: "Error updating profile information",
        color: "red",
      });
    }
  };

  return (
    <>
      <Group position="apart">
        <Title>Edit Profile</Title>
        <Button onClick={signOut}>Sign Out</Button>
      </Group>
      {userDataLoaded && (
        <form onSubmit={form.onSubmit((values) => submitProfileInfo(values))}>
          <Stack>
            <Textarea
              {...form.getInputProps("bio")}
              label="Bio"
              placeholder="Enter bio here..."
            ></Textarea>
            <Group align="end">
              <TextInput
                {...form.getInputProps("profilePicture")}
                label="Profile Image"
                placeholder="Profile Image URL"
              ></TextInput>
              <Avatar src={form.values.profilePicture}></Avatar>
            </Group>
            <Button
              sx={(theme) => ({
                alignSelf: "end",
                paddingInline: theme.spacing.xl,
              })}
              type="submit"
            >
              Save
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};
