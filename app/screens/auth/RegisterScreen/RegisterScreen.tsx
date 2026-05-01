import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CTA from "components/buttons/CTA";
import InputField from "components/inputs/InputField";
import NavHeader from "components/layout/NavHeader";
import BodyMedium from "components/typography/BodyMedium";
import { Colors } from "constants/styles/Colors";
import { AN } from "constants/styles/appStyles";
import MyScrollView from "hoc/MyScrollView";
import ScreenWrapper from "hoc/ScreenWrapper";
import useStyles from "hooks/styles/useStyles";
import { MainStackParamsList } from "navigation/MainStackParamsList";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import API from "services/api";
import { startLoading, stopLoading } from "store/slices/appStateSlice";
import { RootState } from "store";

const RegisterScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamsList, "Register">) => {
  const { styles } = useStyles(createStyles);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.data.userData);
  const guestId = userData?.isGuest ? userData.id : undefined;

  const firstNameInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();
  const confirmPasswordInputRef = useRef<TextInput>();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    dispatch(startLoading());

    try {
      if (password === confirmPassword) {
        await API.registerUser({ firstName, lastName: "", email, password, guestId });
        await API.getUserData();
        navigation.navigate("Landing");
      }
    } catch (e) {
    } finally {
      dispatch(stopLoading());
    }
  };

  const onPressLogin = () => {
    navigation.navigate("SelectProvider", { flow: "login" });
  };

  const formValid =
    !!firstName &&
    !!email &&
    !!password &&
    !!confirmPassword &&
    password === confirmPassword;

  const focusNextInput = (title: string) => {
    if (title === "Name") {
      emailInputRef.current?.focus();
    } else if (title === "E-mail") {
      passwordInputRef.current?.focus();
    } else if (title === "Password") {
      confirmPasswordInputRef.current?.focus();
    }
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.select({ android: undefined, ios: "padding" })}
      >
        <NavHeader title="Register" />
        <MyScrollView>
          <View style={styles.formContainer}>
            <InputField
              title="Name"
              ref={firstNameInputRef}
              onSubmitEditing={() => {
                focusNextInput("Name");
              }}
              autoFocus
              onChangeText={setFirstName}
            />
            <InputField
              title="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              inputMode="email"
              ref={emailInputRef}
              onChangeText={setEmail}
              onSubmitEditing={() => {
                focusNextInput("E-mail");
              }}
            />
            <InputField
              title="Password"
              ref={passwordInputRef}
              autoCorrect={false}
              textContentType="oneTimeCode"
              onChangeText={setPassword}
              onSubmitEditing={() => {
                focusNextInput("Password");
              }}
              icon="eye"
            />
            <InputField
              title="Confirm password"
              ref={confirmPasswordInputRef}
              textContentType="oneTimeCode"
              onChangeText={setConfirmPassword}
              icon="eye"
            />
          </View>

          <CTA title="Register" onPress={registerUser} disabled={!formValid} />

          <View style={styles.footer}>
            <BodyMedium
              text="Already have an account?"
              color="mainTextColor"
              style={styles.haveAnAccountText}
            />

            <CTA title="Log in" onPress={onPressLogin} />
          </View>
        </MyScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      alignItems: "center",
    },
    formContainer: { marginTop: AN(30), width: "100%" },
    haveAnAccountText: { marginBottom: AN(6) },
    footer: {
      marginTop: AN(30),
      width: "100%",
      alignItems: "center",
    },
  });

export default RegisterScreen;
