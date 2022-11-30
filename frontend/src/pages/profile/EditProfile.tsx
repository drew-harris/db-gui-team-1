import { Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const EditProfilePage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const signOut = () => {
    window.localStorage.setItem("jwt", null);
    window.localStorage.setItem("user", null);
    setUser(null);
    navigate("/");
  };

  return (
<<<<<<< Updated upstream
    <div>
      <div>Edit profile</div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
=======
    <>
      <Group mb="md" align="start" position="apart">
        <Title>Edit Profile</Title>
        <Button variant="light" onClick={signOut}>
          Sign Out
        </Button>
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
              <Avatar radius="xl" src={form.values.profilePicture}></Avatar>
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
>>>>>>> Stashed changes
  );
};
