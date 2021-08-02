import React, {useCallback} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Input,
  KeyboardAvoidingView,
  Text,
  VStack,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import LoginSVG from '../../assets/signInSVG.svg';
import {RootStackParamList} from '../../navigation/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {FunctionComponent} from 'react';
import {authAPIS} from '../../apis/auth';
import {setClientToken} from '../../apis/base';

interface SignInForm {
  username: string;
  password: string;
}

type ScreenNavigationProps = StackNavigationProp<RootStackParamList, 'SignIn'>;

interface Props {
  navigation: ScreenNavigationProps;
}

export const SignIn: FunctionComponent<Props> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInForm>();

  const goToSignUpScreen = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );

  const onSubmit = async (data: SignInForm) => {
    try {
      const {accessToken} = await authAPIS.signIn(data);
      console.log(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView h="100%">
      <Center mb={4} mt={6}>
        <LoginSVG width={300} height={150} />
      </Center>
      <Heading w="80%" alignSelf="center">
        Login
      </Heading>
      <Heading size="xs" w="80%" alignSelf="center" mb={4}>
        Please sign in to continue
      </Heading>
      <VStack space={4} w="80%" alignSelf="center">
        {/* username input */}
        <FormControl isRequired isInvalid={'username' in errors}>
          <FormControl.Label>Username</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onBlur, onChange, value}}) => (
              <Input
                variant="filled"
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                value={value}
                borderRadius={20}
                InputLeftElement={
                  <Icon as={FA5Icons} name="user" size={5} pl={2} w={7} />
                }
              />
            )}
            name="username"
            rules={{required: 'Field is required', minLength: 3}}
            defaultValue=""
          />
        </FormControl>

        {/* password input */}
        <FormControl isRequired isInvalid={'password' in errors}>
          <FormControl.Label>Password</FormControl.Label>
          <Controller
            control={control}
            render={({field: {onBlur, onChange, value}}) => (
              <Input
                type="password"
                variant="filled"
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                value={value}
                borderRadius={20}
                InputLeftElement={
                  <Icon as={FA5Icons} name="lock" size={5} pl={2} w={7} />
                }
              />
            )}
            name="password"
            rules={{required: 'Field is required', minLength: 3}}
            defaultValue=""
          />
        </FormControl>

        {/* input button */}
        <Box
          overflow="hidden"
          alignSelf="center"
          borderRadius={40}
          bgColor="transparent"
          w="60%">
          <Button
            onPress={handleSubmit(onSubmit)}
            bg="primary.100"
            _pressed={{
              bg: 'primary.100',
            }}
            _stack={{
              overflow: 'hidden',
            }}
            android_ripple={{color: '#FCBE60', borderless: false}}
            py={4}
            size="lg">
            Submit
          </Button>
        </Box>
      </VStack>
      <Center mt="auto" mb={4}>
        <Text bgColor="#fff">
          Don't have a account?{'  '}
          <Text onPress={() => goToSignUpScreen()}>Sign Up</Text>
        </Text>
      </Center>
    </KeyboardAvoidingView>
  );
};
