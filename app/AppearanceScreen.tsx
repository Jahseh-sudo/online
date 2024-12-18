import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Switch,  
} from 'react-native';
import { useTheme, Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider'

export default function AppearanceScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(16);
  const [fontStyle, setFontStyle] = useState('normal');
  const [buttonRadius, setButtonRadius] = useState(5);

  const theme = useTheme();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const darkMode = await AsyncStorage.getItem('darkMode');
    const bgColor = await AsyncStorage.getItem('backgroundColor');
    const storedTextSize = await AsyncStorage.getItem('textSize');
    const storedFontStyle = await AsyncStorage.getItem('fontStyle');
    const storedButtonRadius = await AsyncStorage.getItem('buttonRadius');

    if (darkMode !== null) setIsDarkMode(JSON.parse(darkMode));
    if (bgColor) setBackgroundColor(bgColor);
    if (storedTextSize) setTextSize(JSON.parse(storedTextSize));
    if (storedFontStyle) setFontStyle(storedFontStyle);
    if (storedButtonRadius) setButtonRadius(JSON.parse(storedButtonRadius));
  };

  const savePreferences = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    savePreferences('darkMode', JSON.stringify(newMode));
  };

  const handleFontStyleChange = (style) => {
    setFontStyle(style);
    savePreferences('fontStyle', style);
  };

  return (
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : DefaultTheme}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.header, { fontSize: textSize, fontStyle }]}>
          Appearance Settings
        </Text>

        <View style={styles.switchContainer}>
          <Text style={[styles.label, { fontSize: textSize }]}>Dark Mode:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>

        <View style={styles.backgroundContainer}>
          <Text style={[styles.label, { fontSize: textSize }]}>Background Color:</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#ff6347', borderRadius: buttonRadius }]}
            onPress={() => {
              setBackgroundColor('#ff6347');
              savePreferences('backgroundColor', '#ff6347');
            }}
          >
            <Text style={[styles.buttonText, { fontSize: textSize }]}>Red</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#add8e6', borderRadius: buttonRadius }]}
            onPress={() => {
              setBackgroundColor('#add8e6');
              savePreferences('backgroundColor', '#add8e6');
            }}
          >
            <Text style={[styles.buttonText, { fontSize: textSize }]}>Light Blue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={[styles.label, { fontSize: textSize }]}>Text Size:</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={12}
            maximumValue={24}
            step={1}
            value={textSize}
            onValueChange={(value) => {
              setTextSize(value);
              savePreferences('textSize', JSON.stringify(value));
            }}
          />
          <Text style={[styles.label, { fontSize: textSize }]}>Size: {textSize}</Text>
        </View>

        <View style={styles.fontStyleContainer}>
          <Text style={[styles.label, { fontSize: textSize }]}>Font Style:</Text>
          <TouchableOpacity
            style={[styles.button, { borderRadius: buttonRadius }]}
            onPress={() => handleFontStyleChange('normal')}
          >
            <Text style={[styles.buttonText, { fontSize: textSize }]}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: buttonRadius }]}
            onPress={() => handleFontStyleChange('italic')}
          >
            <Text style={[styles.buttonText, { fontSize: textSize }]}>Italic</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sliderContainer}>
          <Text style={[styles.label, { fontSize: textSize }]}>Button Radius:</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={30}
            step={1}
            value={buttonRadius}
            onValueChange={(value) => {
              setButtonRadius(value);
              savePreferences('buttonRadius', JSON.stringify(value));
            }}
          />
          <Text style={[styles.label, { fontSize: textSize }]}>Radius: {buttonRadius}</Text>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 5,
    backgroundColor: '#008080',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  fontStyleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
