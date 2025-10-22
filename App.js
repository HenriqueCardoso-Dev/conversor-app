import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Button} from './src/components/Button';
import { styles } from './App.styles';
import { KeyboardAvoidingView } from 'react-native';
import {currencies} from './src/constants/currencies'

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="auto" />

          <View style={styles.header}>
            <Text style={styles.title}>
              Conversor de moedas digital
            </Text>
            <Text style={styles.subTitle}>converta valores entre diferentes moedas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>
              De:
            </Text>
            <View style={styles.currencyGrid}>
              {currencies.map(currency => (
                <Button key={currency.code} currency={currency}></Button>
              ))}
              
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}