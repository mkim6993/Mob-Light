import { useEffect, useState } from 'react';
import { Button, Dimensions, ScrollView, Text, View } from 'react-native';

import { usePartyWebSocket } from '@/hooks/useWebSocket';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Test = () => {
  const router = useRouter();
  const { connected, sendMessage, lastMessage } = usePartyWebSocket();
  const [messageLog, setMessageLog] = useState<String[]>([]);

  const sendSomeMessage = () => {
    sendMessage({ action: 'update', data: 'test' });
  };

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageLog(log => [...log, lastMessage]);
    }
  }, [lastMessage]);

  return (
    <ScrollView
      // style={{
      //   flex: 1,
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   gap: 10,
      // }}
    >
      <View
        style={{
          backgroundColor: connected ? 'green' : 'red',
          width: width * .8,
          height: width * .8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{connected ? 'Connected' : 'Disconnected'}</Text>
      </View>

      <View>
        <Text>
          {JSON.stringify(messageLog, null, 2)}
        </Text>
      </View>

      <Button
        title='Send WS message'
        onPress={() => sendSomeMessage()}
      />
      <Button
        title='go back home'
        onPress={() => router.back()}
      />
    </ScrollView>
  )
}

export default Test;