import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Button } from 'react-native-ui-lib';

function Login() {
  const handleSubmit = () => {
    // Handle login submission
  };

  return (
    <SafeAreaView>
      <Text>Login View</Text>
      <View>
        <Button
          label="Cadastrar"
          size="large"
          text70M
          onPress={handleSubmit}
          borderRadius={8}
        />
      </View>
    </SafeAreaView>
  );
}

export default Login;
