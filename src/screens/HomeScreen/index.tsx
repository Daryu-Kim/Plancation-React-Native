import auth from '@react-native-firebase/auth';
import {Button, View} from 'react-native';

// @ts-ignore
function HomeScreen({navigation}) {
  const onPressedLogOutButton = () => {
    auth()
      .signOut()
      .then(_ => {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginMain'}],
        });
      });
  };

  return (
    <View>
      <Button title="로그아웃" onPress={onPressedLogOutButton} />
    </View>
  );
}
export default HomeScreen;
