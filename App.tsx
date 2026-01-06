import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'numbers of character should be more then 4')
    .max(16, 'number of character should be less the 16')
    .required('length is required'),
});

export default function App() {
  const [password, setpassword] = useState('');
  const [isPasswordgenrated, setisPasswordgenrated] = useState(false);
  const [lowercase, setlowercase] = useState(true);
  const [uppercase, setuppercase] = useState(false);
  const [numbers, setnumbers] = useState(false);
  const [symbols, setsymbols] = useState(false);

  const generatedPasswrodString = (passwordLength: number) => {
    let characterList = '';

    let upperCaseChart = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCaseChart = 'abcdefghijklmnopqrstuvwxyz';
    let numberChart = '0123456789';
    let symbolchart = '!@#$%^&*|?_-+=';

    if (uppercase) {
      characterList += upperCaseChart;
    }
    if (lowercase) {
      characterList += lowerCaseChart;
    }
    if (numbers) {
      characterList += numberChart;
    }
    if (symbols) {
      characterList += symbolchart;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setpassword(passwordResult);
    setisPasswordgenrated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      let characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setpassword('');
    setisPasswordgenrated(false);
    setlowercase(false);
    setuppercase(false);
    setnumbers(false);
    setsymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatedPasswrodString(Number(values.passwordLength));
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType="numeric"
                    placeholder="Ex-8"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include LowerCase</Text>
                  <View>
                    <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={lowercase}
                    onPress={() => setlowercase(!lowercase)}
                    fillColor='#29AB87'
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                  <View>
                    <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={uppercase}
                    onPress={() => setuppercase(!uppercase)}
                    fillColor='#11b0faff'
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <View>
                    <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={numbers}
                    onPress={() => setnumbers(!numbers)}
                    fillColor='#4a08ffff'
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <View>
                    <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={symbols}
                    onPress={() => setsymbols(!symbols)}
                    fillColor='#fc3939ff'
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity 
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                    >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                  >
                    <Text style={styles.primaryBtnTxt}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordgenrated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle} >Result:</Text>
            <Text style={styles.description} >Long Press to Copy</Text>
            <Text selectable={true} style={styles.generatedPassword} >{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    minHeight: '100%',
    flex: 1,
    backgroundColor: '#000',
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    color: 'white',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#282828ff',
    marginBottom: 8,
  },
  heading: {23
    fontSize: 15,
    color: 'white',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ffffff',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#ed3838ff',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#e0e0e0ff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
