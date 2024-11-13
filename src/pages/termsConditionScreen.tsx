import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TermsAndCondition = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAcceptPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="return-up-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LoyX</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
          indicatorStyle="black"
          style={styles.scrollView}
        >
          <Text style={styles.heading}>Customer Privacy Policy</Text>
          <Text style={styles.text}>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut alUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al
          </Text>

          <Text style={styles.subHeading}>Terms</Text>
          <Text style={styles.termsText}>
            {`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line Lorem Ipsum, "Lorem ipsum do
lor sit amet..", comes from a line in section 1.10.32.
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
          </Text>
        </ScrollView>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptPress}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    marginTop: 40,
    left: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingBottom: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  acceptButton: {
    width: '90%',
    height: 52,
    backgroundColor: '#222222',
    paddingVertical: 16,
    alignSelf: 'center',
    borderRadius: 300,
    marginBottom: 30,
  },
  acceptButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',  
  },
});

export default TermsAndCondition;
