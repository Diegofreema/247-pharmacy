'use dom';

import { useCredoPayment } from 'react-credo';
import { StyleSheet, Image, Platform, Button } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

function generateRandomAlphanumeric(length: number) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
const transRef = generateRandomAlphanumeric(20);

const config = {
  key: ' 1PUB3348dC620365sDddDMiS2PuHHqYr7kBzeB', //You should store your API key as an environment variable
  customerFirstName: 'Ciroma',
  customerLastName: 'Chukwuma',
  email: 'ciroma.chukwuma@example.com',
  amount: 109000,
  currency: 'NGN',
  bearer: 0,
  reference: transRef, // Please generate your own transRef that is unique for each transaction
  customerPhoneNumber: '2348032698425',
  callbackUrl: 'https://merchant-test-line.netlify.app/successful',
  metadata: {
    customFields: [
      { variable_name: 'gender', value: 'Male', display_name: 'Gender' },
      {
        variable_name: 'address',
        value: '27/29 Adeyemo Alakija street, VI',
        display_name: 'Address',
      },
    ],
  },
  onClose: () => {
    console.log('Widget Closed');
  },
  callBack: (response) => {
    console.log('Successful Payment');
    console.log(response);
    window.location.href = response.callbackUrl;
  },
};

export default function TabTwoScreen() {
  const initializePayment = useCredoPayment(config);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <Button title="Press" onPress={initializePayment} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
