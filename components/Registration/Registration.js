import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import auth from "../../firebase.init";

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

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegistration = () => {
    // Handle registration logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

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
      createUserWithEmailAndPassword(email, password);
      setPassError("");
      setBirthReq("");
      setEmailReq("");
      setNameReq("");
      setPasswordReq("");
      // toast.success("Register Done");
    } else {
      setPassError("Password and Confirm Password not matched");
      setBirthReq("");
      setEmailReq("");
      setNameReq("");
      setPasswordReq("");
    }

    // Clear form fields
    // setName("");
    // setEmail("");
    // setPassword("");
  };

  useEffect(() => {
    if (user && !error) {
      toast.success("Register Done");
    }
  }, [user]);

  return (
    <KeyboardAvoidingView>
      <ToastContainer />
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>
            Name<Text style={styles.errorText}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            textContentType="username"
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.errorText}>
            {nameReq !== "" ? nameReq : null}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Date of Birth<Text style={styles.errorText}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your birth date"
            value={birth}
            onChangeText={(text) => setBirth(text)}
          />
          <Text style={styles.errorText}>
            {birthReq !== "" ? birthReq : null}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Email<Text style={styles.errorText}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <Text style={styles.errorText}>
            {emailReq !== "" ? emailReq : null}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Password<Text style={styles.errorText}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            textContentType="password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Text style={styles.errorText}>
            {passwordReq !== "" ? passwordReq : null}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>
            Confirm Password<Text style={styles.errorText}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            textContentType="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
          <Text style={styles.errorText}>
            {passError !== "" ? passError : null}
          </Text>
        </View>

        <Text style={styles.errorText}>{error ? error.message : ""}</Text>
        <Button title="Register" onPress={handleRegistration} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
  },
  label: {
    textTransform: "uppercase",
    fontWeight: "bold",
    // marginTop: "10px",
    // marginBottom: "5px",
    textAlign: "left",
    width: "100%",
  },
});
