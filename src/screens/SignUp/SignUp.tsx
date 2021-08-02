import React, {FunctionComponent, useCallback} from 'react';
import {
  Flex,
  Icon,
  KeyboardAvoidingView,
  Heading,
  VStack,
  FormControl,
  Input,
  Box,
  Button,
  Center,
  Text,
} from 'native-base';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/routes';
import {useForm, Controller} from 'react-hook-form';
import {authAPIS} from '../../apis/auth';

interface SignUpForm {
  username: string;
  password: string;
  email: string;
}

type ScreenNavigationProps = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: ScreenNavigationProps;
}

export const SignUp: FunctionComponent<Props> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpForm>();

  const goToSignInScreen = useCallback(
    () => navigation.navigate('SignIn'),
    [navigation],
  );

  const onSubmit = async (data: SignUpForm) => {
    try {
      await authAPIS.signUp(data);
      console.log('created user!');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <KeyboardAvoidingView h="100%">
      <Flex pl={2}>
        <Icon as={FA5Icons} name="arrow-left" size={8} />
      </Flex>
      <Heading w="80%" alignSelf="center">
        Create Account
      </Heading>
      <Heading size="xs" w="80%" alignSelf="center" mb={4}>
        Please fill the input blow here
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

        {/* email input */}
        <FormControl isRequired isInvalid={'email' in errors}>
          <FormControl.Label>Email</FormControl.Label>
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
                  <Icon as={FA5Icons} name="envelope" size={5} pl={2} w={7} />
                }
              />
            )}
            name="email"
            rules={{required: 'Field is required', minLength: 3}}
            defaultValue=""
          />
        </FormControl>

        {/*  signUp button */}
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
            Sign Up
          </Button>
        </Box>
      </VStack>
      <Center mt="auto" mb={4}>
        <Text bgColor="#fff">
          Already have a account?{'  '}
          <Text onPress={() => goToSignInScreen()}>Sign in</Text>
        </Text>
      </Center>
    </KeyboardAvoidingView>
  );
};
