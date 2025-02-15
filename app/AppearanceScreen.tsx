import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Switch, 
  ScrollView 
} from 'react-native';
import { 
  useTheme, 
  Provider as PaperProvider, 
  DefaultTheme, 
  MD3DarkTheme, 
  Card, 
  Divider 
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

const themes = [
  { name: 'Default', colors: { background: '#ffffff', primary: '#6200ea' } },
  { name: 'Ocean', colors: { background: '#add8e6', primary: '#008080' } },
  { name: 'Sunset', colors: { background: '#ffefd5', primary: '#ff6347' } },
];

export default function AppearanceScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [textSize, setTextSize] = useState(16);
  const [fontStyle, setFontStyle] = useState('normal');
  const [buttonRadius, setButtonRadius] = useState(5);

  const theme = useTheme();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    const darkMode = await AsyncStorage.getItem('darkMode');
    const storedTheme = await AsyncStorage.getItem('selectedTheme');
    const storedTextSize = await AsyncStorage.getItem('textSize');
    const storedFontStyle = await AsyncStorage.getItem('fontStyle');
    const storedButtonRadius = await AsyncStorage.getItem('buttonRadius');

    if (darkMode !== null) setIsDarkMode(JSON.parse(darkMode));
    if (storedTheme) setSelectedTheme(JSON.parse(storedTheme));
    if (storedTextSize) setTextSize(JSON.parse(storedTextSize));
    if (storedFontStyle) setFontStyle(storedFontStyle);
    if (storedButtonRadius) setButtonRadius(JSON.parse(storedButtonRadius));
  };

  const savePreferences = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    savePreferences('darkMode', newMode);
  };

  const handleThemeSelection = (theme) => {
    setSelectedTheme(theme);
    savePreferences('selectedTheme', theme);
  };

  return (
    <PaperProvider theme={isDarkMode ? MD3DarkTheme : DefaultTheme}>
      <ScrollView style={{ flex: 1, backgroundColor: selectedTheme.colors.background }}>
        <View style={[styles.container]}>
          <Text style={[styles.header, { fontSize: textSize, fontStyle }]}>
            Appearance Settings
          </Text>

          <Card style={styles.card}>
            <Card.Title title="Dark Mode" />
            <Card.Content>
              <View style={styles.switchContainer}>
                <Text style={[styles.label, { fontSize: textSize }]}>Enable Dark Mode:</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                  onValueChange={toggleDarkMode}
                  value={isDarkMode}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Theme Selection" />
            <Card.Content>
              {themes.map((theme) => (
                <TouchableOpacity
                  key={theme.name}
                  style={[
                    styles.themeButton, 
                    {
                      backgroundColor: theme.colors.primary,
                      borderRadius: buttonRadius,
                    },
                  ]}
                  onPress={() => handleThemeSelection(theme)}
                >
                  <Text style={styles.buttonText}>{theme.name}</Text>
                </TouchableOpacity>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Text Settings" />
            <Card.Content>
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
                    savePreferences('textSize', value);
                  }}
                />
                <Text style={[styles.label, { fontSize: textSize }]}>Size: {textSize}</Text>
              </View>

              <Divider style={{ marginVertical: 10 }} />

              <Text style={[styles.label, { fontSize: textSize }]}>Font Style:</Text>
              <View style={styles.fontStyleContainer}>
                {['normal', 'italic'].map((style) => (
                  <TouchableOpacity
                    key={style}
                    style={[styles.button, { borderRadius: buttonRadius }]}
                    onPress={() => {
                      setFontStyle(style);
                      savePreferences('fontStyle', style);
                    }}
                  >
                    <Text style={styles.buttonText}>{style.charAt(0).toUpperCase() + style.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Button Radius" />
            <Card.Content>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={30}
                step={1}
                value={buttonRadius}
                onValueChange={(value) => {
                  setButtonRadius(value);
                  savePreferences('buttonRadius', value);
                }}
              />
              <Text style={[styles.label, { fontSize: textSize }]}>Radius: {buttonRadius}</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#6200ea',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  themeButton: {
    padding: 15,
    marginVertical: 5,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  fontStyleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
});
