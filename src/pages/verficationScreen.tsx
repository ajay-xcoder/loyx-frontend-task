import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../redux/slice/verifyOtpSlice';

type VerificationScreenRouteProp = RouteProp<{ params: { email: string, userId: string } }, 'params'>;

const VerificationScreen: React.FC<{ route: VerificationScreenRouteProp }> = ({ route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { email, userId } = route.params;

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (code[index] !== '') {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    const otp = code.join('');
    console.log("OTP formed:", otp);

    if (otp.length === 4) {
      try {
        console.log("OTP length is 4, submitting...");
        await dispatch(verifyOtp({ user_id: userId, verification_code: otp })).unwrap();
        setModalVisible(true); 
        console.log("OTP successfully verified.");
      } catch (error) {
        console.error('OTP verification failed:', error);
      }
    } else {
      console.log('Please enter a valid OTP. OTP length:', otp.length);
    }

    setLoading(false);
  };

  const handleOkPress = () => {
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeTabs', params: { screen: 'Home' } }],
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="return-up-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Verify email</Text>
      <Text style={styles.subtitle}>
        To make sure we have the right contact details for you, we’ve sent an email to
        <Text style={styles.boldText}> {email}</Text>. Please enter the OTP sent to your email to verify your address.
      </Text>
      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.inputBox}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleOtpSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Thank you</Text>
            <Text style={styles.modalSubtitle}>Your email has been verified.</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    justifyContent: 'space-between', 
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 37,
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A6A6A',
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: 40,
  },
  boldText: {
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
  },
  inputBox: {
    width: 48,
    height: 61,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#222222',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 24,
  },
  submitButton: {
    marginTop: 'auto',  
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 30
  },
  submitButtonText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 361,
    height: 230,
    borderRadius: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    lineHeight: 22,
    marginTop: 30,
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  okButton: {
    width: 326,
    height: 52,
    marginTop: 50,
    borderColor: '#222222',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});


export default VerificationScreen;
