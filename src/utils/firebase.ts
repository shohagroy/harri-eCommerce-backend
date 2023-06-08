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

export const loginUserToFirebase = async (email: string, password: string) => {
  try {
    const userCredential = await admin.auth().getUserByEmail(email);
    const userRecord = userCredential.toJSON();

    console.log(userRecord);

    // if (userRecord && userRecord.password === password) {
    //   console.log("User logged in successfully:", userRecord.email);
    //   return userRecord;
    // } else {
    //   console.error("Invalid email or password");
    //   throw new Error("Invalid email or password");
    // }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  console.log("google call");
};

export default admin;
