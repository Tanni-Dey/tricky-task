import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { StyleSheet, Text, TextInput, View } from "react-native";
import auth from "../../firebase.init";
import CustomButton from "../CustomButton";

export default function Registration() {
  const [name, setName] = useState("");
  const [nameReq, setNameReq] = useState("");
  const [birth, setBirth] = useState("");
  const [birthReq, setBirthReq] = useState("");
  const [email, setEmail] = useState("");
  const [emailReq, setEmailReq] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReq, setPasswordReq] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);

  const handleRegistration = async () => {
    if (name === "") {
      setNameReq("Name is Required");
      setBirthReq("");
      setEmailReq("");
      setPasswordReq("");
    } else if (birth === "") {
      setBirthReq("Birth Date is Required");
      setNameReq("");
      setEmailReq("");
      setPasswordReq("");
    } else if (email === "") {
      setEmailReq("Please Enter your Email");
      setBirthReq("");
      setNameReq("");
      setPasswordReq("");
    } else if (password === "") {
      setPasswordReq("Enter Your Password");
      setBirthReq("");
      setEmailReq("");
      setNameReq("");
    } else if (password === confirmPassword) {
      await createUserWithEmailAndPassword(email, password);
      await sendEmailVerification();
      if (!error) {
        toast.success("Sent email for verification");
      }
      setPassError("");
      setBirthReq("");
      setEmailReq("");
      setNameReq("");
      setPasswordReq("");
    } else {
      setPassError("Password and Confirm Password not matched");
      setBirthReq("");
      setEmailReq("");
      setNameReq("");
      setPasswordReq("");
    }

    // Clear form fields
    setName("");
    setBirth("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (user && !error) {
      toast.success("Register Done");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      if (error.message.includes("invalid-email")) {
        setFirebaseError("Email is invalid");
      } else if (error.message.includes("at least 6 characters")) {
        setFirebaseError("Password should be 6 characters");
      } else if (error.message.includes("email-already-in-use")) {
        setFirebaseError("Email is already used");
      } else {
        setFirebaseError("");
      }
    } else setFirebaseError("");
  });

  return (
    <View style={styles.container}>
      <ToastContainer />
      <View style={styles.field}>
        <Text style={styles.label}>
          Name<Text style={styles.errorText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          textContentType="username"
          placeholderTextColor="#B5B5B5"
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.errorText}>{nameReq !== "" ? nameReq : null}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Date of Birth<Text style={styles.errorText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your birth date"
          placeholderTextColor="#B5B5B5"
          value={birth}
          onChangeText={(text) => setBirth(text)}
        />
        <Text style={styles.errorText}>
          {birthReq !== "" ? birthReq : null}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Email<Text style={styles.errorText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#B5B5B5"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={styles.errorText}>
          {emailReq !== "" ? emailReq : null}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Password<Text style={styles.errorText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#B5B5B5"
          value={password}
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.errorText}>
          {passwordReq !== "" ? passwordReq : null}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Confirm Password<Text style={styles.errorText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#B5B5B5"
          textContentType="password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        <Text style={styles.errorText}>
          {passError !== "" ? passError : null}
        </Text>
      </View>

      <Text style={styles.errorText}>{firebaseError ? firebaseError : ""}</Text>
      <CustomButton title="Register" onPress={handleRegistration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5865F2",
    padding: "30px",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    textTransform: "uppercase",
    fontWeight: 500,
    color: "white",
    textAlign: "left",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: "10px",
    backgroundColor: "white",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
  },
});
