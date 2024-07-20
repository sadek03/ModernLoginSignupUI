import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {dataBaseCreate} from '../utils/apiKeys';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const InsertAPIURL = dataBaseCreate + '/checking-api/create.php';

  const headers = {
    'Content-Type': 'application/json',
  };

  const handleSubmit = async () => {
    const data = {
      table: 'users',
      validation: [
        {
          name: 'required|string',
          email: 'required|email|unique',
          phone: 'required|numeric|unique|length:10',
          password: 'required|min-length:6',
        },
      ],
      data: [{name: name, email: email, password: password, phone: phone}],
    };

    try {
      const response = await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      if (jsonResponse.status === 'success') {
        handleLogin();
      } else {
        ToastAndroid.show(jsonResponse.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error', error);
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
            <Text style={styles.headingText}>Let's get</Text>
            <Text style={styles.headingText}>started</Text>
          </View>
          {/* form  */}
          <KeyboardAvoidingView>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name={'person-outline'}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.secondary}
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name={'mail-outline'}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Email"
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <SimpleLineIcons
                  name={'screen-smartphone'}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your phone no"
                  placeholderTextColor={colors.secondary}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={text => setPhone(text)}
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
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSecureEntry(prev => !prev);
                  }}>
                  <SimpleLineIcons
                    name={secureEntry ? 'eye' : 'eye-off'}
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={handleSubmit}>
                <Text style={styles.loginText}>Sign up</Text>
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
                <Text style={styles.accountText}>Already have an account!</Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={styles.signupText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    marginTop: 40,
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
