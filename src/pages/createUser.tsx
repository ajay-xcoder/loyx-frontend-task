import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { verifyEmail } from '../../redux/slice/verifyEmailSlice';

const CustomCheckBox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <TouchableOpacity onPress={onChange} style={styles.checkbox}>
    <View style={[styles.checkboxBox, checked && styles.checkboxChecked]} />
  </TouchableOpacity>
);

const CreateUserScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data, loading, error } = useSelector((state: RootState) => state.verifyEmail);
  console.log("data", data)

  const handleEmailChange = (input: string) => {
    setEmail(input);
  };

  const handleContinue = async () => {
    console.log("email",email)
    if (email) {
      const payload = {
        user_id: '8d5f2a96-4eee-428b-8257-aaa44c86c6e2',
        user_email: email,
      };
      await dispatch(verifyEmail(payload));
    }
  };

  if (data?.success && data?.message === 'Email verification successful' && !loading) {
    const updatedUserId = data.user_id;  
    navigation.navigate('Verification', { userId: updatedUserId });
  }
  
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hey Mark, what's your email?</Text>
        <Text style={styles.subtitle}>
          We need this only one time and to sync your membership with brands
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {loading && <Text>Loading...</Text>}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <View style={[styles.checkboxContainer,{marginTop : error  ? 10 :0}]}>
          <CustomCheckBox checked={isSubscribed} onChange={() => setIsSubscribed(!isSubscribed)} />
          <Text style={styles.checkboxLabel}>
            Keep me up to date about personalised offers and services
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, email && isSubscribed ? styles.buttonActive : styles.buttonDisabled]}
          disabled={!email || !isSubscribed}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 37,
    color: '#222222',
    marginBottom: 8,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
   },
  checkbox: {
    marginRight: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonActive: {
    backgroundColor: '#000',
  },
  buttonDisabled: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateUserScreen;
