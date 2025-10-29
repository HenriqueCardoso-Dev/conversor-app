import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Button} from './src/components/Button';
import { styles } from './App.styles';
import { KeyboardAvoidingView } from 'react-native';
import {currencies} from './src/constants/currencies'
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';
import { exchangerateApi } from './src/services/api';
import { useState } from 'react';
import { convertCurrency } from './utils/convertCurrency';

export default function App() {

  const [amount, setAmout] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  async function handleCurrencyApi() {

    try {
      setLoading(true)
      
      if (!amount) return
  
      const data = await exchangerateApi(fromCurrency);
      setExchangeRate(data.rates[toCurrency])
      setResult(convertCurrency(amount, exchangeRate))
      
    } catch (err) {
      alert("Erro, tente novamente!")
    } finally {
      setLoading(false)
    }

  }

  function swapCurrency() {
    setResult('');
    setAmout('')
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="auto" />

          <View style={styles.header}>
            <Text style={styles.title}>
              Conversor de moedas
            </Text>
            <Text style={styles.subTitle}>converta valores entre diferentes moedas</Text>
          </View>

          <Text>{result}</Text>


          <View style={styles.card}>
            <Text style={styles.label}>
              De:
            </Text>
            <View style={styles.currencyGrid}>
              {currencies.map(currency => (
                <Button 
                  key={currency.code} 
                  currency={currency} 
                  onPress={() => {
                    setResult('')
                    setFromCurrency(currency.code)
                  }}
                  isSelected={fromCurrency === currency.code}
                ></Button>
              ))}

            </View>

            <Input label="Valor:" onChangeText={(value) => {
              setResult('')
              setAmout(value)
            }} value={amount}/>

            <TouchableOpacity style={styles.swapButton} onPress={swapCurrency}>
              <Text style={styles.swapButtonText}>
                ↑↓
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>
              Para:
            </Text>
            <View style={styles.currencyGrid}>
              {currencies.map(currency => (
                <Button 
                  key={currency.code} 
                  currency={currency} 
                  variant='secondary' 
                  onPress={() => {
                    setResult('')
                    setToCurrency(currency.code)
                  }} 
                  isSelected={toCurrency === currency.code}
                ></Button>
              ))}

            </View>
          </View>

          <TouchableOpacity style={[styles.convertButton, (!amount || loading) && styles.convertButtonDisabled]} onPress={handleCurrencyApi} disabled={!amount || loading}>
            {
              loading ? (
                <ActivityIndicator color="white"/>
              ) : (
                <Text style={styles.swapButtonText}>
                  Converter
                </Text>
              )
            }
            
          </TouchableOpacity>

          <ResultCard
            exchangeRate={exchangeRate}
            result={result}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
          />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}