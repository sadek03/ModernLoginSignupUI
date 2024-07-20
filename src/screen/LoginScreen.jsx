import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {dataBaseCreate} from '../utils/apiKeys';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }

    const RequestApiURL = dataBaseCreate + '/checking-api/read.php';
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = {
      table: 'users',
      select: ['name', 'email'],
      rawConditions: [`WHERE email = '${email}' AND password = '${password}'`],
    };

    try {
      const response = await fetch(RequestApiURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json();
      // console.log(jsonResponse);

      if (
        jsonResponse.status === 'success' &&
        jsonResponse.data &&
        jsonResponse.data.length > 0
      ) {
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        navigation.navigate('MainScreen');
      } else {
        ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show(
        'An error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={handleGoBack}>
            <Ionicons
              name={'arrow-back-outline'}
              color={colors.primary}
              size={25}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>Hey,</Text>
            <Text style={styles.headingText}>Welcome</Text>
            <Text style={styles.headingText}>Back</Text>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name={'mail-outline'}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.inputContainer}>
                <SimpleLineIcons
                  name={'lock'}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.secondary}
                  secureTextEntry={secureEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureEntry(prev => !prev)}>
                  <SimpleLineIcons
                    name={secureEntry ? 'eye' : 'eye-off'}
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.continueText}>or continue with</Text>
              <TouchableOpacity style={styles.googleButtonContainer}>
                <Image
                  source={require('../assets/google.png')}
                  style={styles.googleImage}
                />
                <Text style={styles.googleText}>Google</Text>
              </TouchableOpacity>
              <View style={styles.footerContainer}>
                <Text style={styles.accountText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={handleSignup}>
                  <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
});
