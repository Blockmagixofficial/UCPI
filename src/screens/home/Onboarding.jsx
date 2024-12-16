import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native'

const { width, height } = Dimensions.get('window')

const data = [
  {
    title: 'Simplified transaction',
    description: 'One app for all your international payment needs.',
  },
  {
    title: 'Low fees, Transparent Rates',
    description: 'Funds reach your destination in minutes.',
  },
  {
    title: 'Speed and Reliability',
    description: 'Fast and Secure Transfers',
  },
]

const Onboarding = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1
      if (nextIndex >= data.length) {
        nextIndex = 0 // Loop back to the first slide
      }
      setCurrentIndex(nextIndex)
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      })
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [currentIndex])

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentIndex(index)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={handleScroll}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Solid Orange Bottom Section */}
      <View style={styles.orangeSection}>
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation?.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation?.navigate('Signup')}
          >
            <Text style={styles.createAccountButtonText}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Full white background
  },
  slide: {
    width,
    height,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: height * 0.3, // Adjust padding to leave space for orange section
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FF6F00',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  paginationContainer: {
    position: 'absolute',
    top: height * 0.6, // Position just above the orange section
    width: '100%',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF7E5F', // Active dot matches the orange color
  },
  inactiveDot: {
    backgroundColor: '#FFD6C5', // Light orange for inactive dot
  },
  orangeSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%', // Match the proportion of the orange section from your UI
    backgroundColor: '#FF7E5F', // Solid orange background
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: "#000",
    fontWeight: '600',
    fontSize: 16,
  },
  createAccountButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
})

export default Onboarding
