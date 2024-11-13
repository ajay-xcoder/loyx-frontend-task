import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

interface ScreenData {
    title: string;
    subtitle: string;
    image: any;
}

const screensData: ScreenData[] = [
    {
        title: "One app all things discount & offers",
        subtitle: "One app is all you need",
        image: require('../assets/images/banner_1.png'),
    },
    {
        title: "Collect points on everything you buy",
        subtitle: "Add your card info to be identified when you buy anything to get your points",
        image: require('../assets/images/banner_2.png'),
    },
    {
        title: "Save money with loyalty program",
        subtitle: "One app is all you need",
        image: require('../assets/images/banner_3.png'),
    },
    {
        title: "Sync all your membership with all",
        subtitle: "One app is all you need",
        image: require('../assets/images/banner_4.png'),
    },
];

const SplashScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [fillProgress, setFillProgress] = useState(new Animated.Value(0));
    const navigation = useNavigation();  // <-- Initialize navigation

    useEffect(() => {
        const fillSegment = () => {
            Animated.timing(fillProgress, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            }).start(({ finished }) => {
                if (finished) {
                    fillProgress.setValue(0);
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % screensData.length);
                }
            });
        };

        fillSegment();

        const interval = setInterval(() => {
            fillSegment();
        }, 1500);

        return () => clearInterval(interval);
    }, [fillProgress]);

    const getSegmentWidth = (segmentIndex: number) => {
        if (segmentIndex < currentIndex) {
            return "100%";
        } else if (segmentIndex === currentIndex) {
            return fillProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
            });
        }
        return "0%";
    };

    const handleLoginButtonClick = () => {
        navigation.navigate('CreateUser'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                {[0, 1, 2, 3].map((_, index) => (
                    <View key={index} style={styles.progressBarSegment}>
                        <Animated.View
                            style={[
                                styles.progressBarFill,
                                { width: getSegmentWidth(index) },
                            ]}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.screenContent}>
                <Image
                    source={screensData[currentIndex].image}
                    style={styles.image}
                    key={currentIndex}
                />
                <Text style={styles.title}>{screensData[currentIndex].title}</Text>
                <Text style={styles.subtitle}>{screensData[currentIndex].subtitle}</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleLoginButtonClick}>
                    <Image
                        source={require('../assets/images/bankid.png')}
                        style={styles.bankImage}
                    />
                    <Text style={styles.buttonText}>Log in with BankID</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    By proceeding, I accept{' '}
                    <Text style={styles.boldUnderlineText}>LoyX’s privacy policy</Text> and{' '}
                    <TouchableOpacity onPress={()=>navigation.navigate('TermsAndCondition') }>
                    <Text style={styles.boldUnderlineText}>terms of use</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 4,
        position: 'absolute',
        top: 65,
        left: 20,
        right: 20,
    },
    progressBarSegment: {
        flex: 1,
        height: '100%',
        backgroundColor: '#e0e0e0',
        marginHorizontal: 2,
        overflow: 'hidden',
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#000',
    },
    screenContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 160,
        left: 0,
        right: 0,
    },
    image: {
        width: 285,
        height: 286,
        resizeMode: 'contain',
        opacity: 1,
    },
    title: {
        fontFamily: 'Damgood-Bold',
        fontSize: 45,
        fontWeight: '800',
        lineHeight: 50,
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: '#222222',
        opacity: 1,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginTop: 20,
    },

    footer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        alignItems: 'center',
    },

    button: {
        width: 361,
        paddingVertical: 14,
        borderRadius: 50,
        borderTopWidth: 1,
        borderColor: '#222222',
        backgroundColor: '#222222',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',  
        marginBottom: 10,
    },
    buttonText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        letterSpacing: 0.005,
        color: '#fff',
        marginLeft: 10,  
    },
    footerText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 15,
        textAlign: 'center',
        color: '#555',
    },

    boldUnderlineText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',  
        lineHeight: 15,
        textAlign: 'center',
        textDecorationLine: 'underline', 
        textDecorationStyle: 'solid',
        color: '#000',  
    },

    bankImage: {
        height: 28,
        width: 28,
    }
});

export default SplashScreen;
