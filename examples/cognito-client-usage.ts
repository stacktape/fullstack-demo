import { Amplify } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

export const setupAmplify = () => {
  return Amplify.configure({
    region: 'eu-west-1',
    userPoolId: process.env.USERPOOL_ID,
    userPoolWebClientId: process.env.USERPOOL_CLIENT_ID,
  });
};

await Auth.signUp({ username: 'my-username', password: 'my-password' });

await Auth.confirmSignUp('my-username', '000000');

await Auth.signIn({ username: 'my-username', password: 'my-password' });

await Auth.signOut();

await Auth.forgotPassword('my-username');

// etc.
