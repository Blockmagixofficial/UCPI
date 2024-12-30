import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Image,
} from 'react-native';
import Svg, { Rect, Defs, Pattern, Use, Image as SvgImage } from 'react-native-svg';
import rightArrow from '../../assets/rightArrow.png';
import Keypad from '../../components/keypad';

const RightArrowSVG = ({ opacity }) => (
  <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Rect
      y="15.9989"
      width="16"
      height="16"
      transform="rotate(-89.3318 0 15.9989)"
      fill={`url(#pattern0)`}
      opacity={opacity}
    />
    <Defs>
      <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <Use href="#image0" transform="scale(0.03125)" />
      </Pattern>
      <SvgImage
        id="image0"
        width="32"
        height="32"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYZJREFUWEftlUFKxDAUhv8MWelGxBt4ERFciEtXrryDiqhNy4OJQkHpHVy5cCfuXXgMPYG6KAx2kzaSYZQ6Zto0jQ7IdNkm/b7+7+WVYc4XmzMfC4FFAuMEiIgXRbGcpmn+F01JRCsARkSkWJIkW1VV3QBYBXDLOd8novffECGipbIsr7XWuwDeBoPBHhNCPAFYrwEfOOc7oSUMXCl1D2Cjxno2Ai8A1qa+OKjEDLhBvrIoio4ZY6kl8iASDXCDPBk3YRzH51rrM4vEI+d8m4hGPj0xgd8B2LTsz6SUB19zILSEC9xIfRtEoSRc4T8EQpSjC9wq0EeiK3ymgI+ED7xRwDwUQlwAOG07Hb7wVgEXCQCVUqrxqDUdYaffsRDiEsChbVhN7tXH6+eyKynlUdv8cBJoScLGGA+ZNrhTCeovaeiJ+jJneGcBhyQ6wb0EGiQ6w70FzMYoihLGmJhkP5RSDl1qPr3GuQltLzfnP89znWVZ4QPvlYAvMGgCISR6lWAh8C8S+AAoTel6fONJ4wAAAABJRU5ErkJggg=="
      />
    </Defs>
  </Svg>
);

const RequestScreen = () => {
  const [amount, setAmount] = useState('');
  const pan = useState(new Animated.ValueXY())[0];

  const handlePressNumber = (key) => {
    if (key === 'Cancel') {
      setAmount('');
    } else {
      setAmount((prev) => prev + key);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      if (pan.x._value > 100) {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Transfer To <Text style={styles.highlight}>Joe Biden</Text>
        </Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recipientContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>J</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>Joe Biden</Text>
          <Text style={styles.recipientID}>23XR...56DD******</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.EnterAmount}>Enter Amount</Text>
      </View>
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountInput}
          keyboardType="numeric"
          placeholder="$0.00"
          placeholderTextColor="#808080"
          value={amount}
          onChangeText={(value) => setAmount(value.replace(/[^0-9.]/g, ''))}
        />
      </View>
      <View style={styles.sendNowContainer}>
        <View style={styles.blackBackground}>
          <Text style={styles.sendNowText}>Request Now</Text>
          <View style={styles.fadingArrowsContainer}>
            <RightArrowSVG opacity={0.4} />
            <RightArrowSVG opacity={0.7} />
            <RightArrowSVG opacity={1.0} />
          </View>
          <Animated.View
            style={[styles.orangeButton, { transform: [{ translateX: pan.x }] }]}
            {...panResponder.panHandlers}
          >
            <Image source={rightArrow} style={styles.arrowImage} />
          </Animated.View>
        </View>
      </View>
      <Keypad onPress={handlePressNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
    flex: 1,
  },
  highlight: {
    color: '#FF6F50',
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE8D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FF6F50',
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  recipientID: {
    fontSize: 13,
    color: '#A3A3A3',
    fontFamily: 'Inter',
  },
  eyeIcon: {
    fontSize: 20,
    color: '#FF6F50',
    fontFamily: 'Inter',
  },
  EnterAmount: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'lightgrey',
    marginTop: 50,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  amountInput: {
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    color: '#555',
  },
  sendNowContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  blackBackground: {
    backgroundColor: '#222222',
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 60,
    marginBottom: 10,
  },
  sendNowText: {
    color: 'lightgrey',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
  },
  fadingArrowsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    gap: 5,
  },
  orangeButton: {
    position: 'absolute',
    backgroundColor: '#FF6F50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
    zIndex: 10,
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default RequestScreen;
