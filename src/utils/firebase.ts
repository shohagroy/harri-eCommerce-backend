import { InitialUser } from "../modules/user/user.interface";

var admin = require("firebase-admin");
var serviceAccount = require("../firebase/react-component-bae6a-firebase-adminsdk-me4kd-f1dee5683d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const createUserToFirebase = async (userInfo: InitialUser) => {
  const { email, password } = userInfo;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    const newUser = {
      uid: userRecord.uid,
      firstName: "",
      lastName: "",
      displayName: userRecord.displayName,
      avatar: userRecord.photoUrl,
      email: userRecord.email,
      phone: userRecord.phoneNumber,
      address: "",
      role: "user",
      verified: false,
    };

    return newUser;
  } catch (error) {
    return error;
  }
};
