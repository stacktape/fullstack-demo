import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

export const cognitoClient = new CognitoIdentityProvider({});

export const cognitoJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.STP_MAIN_USER_POOL_ID,
  clientId: process.env.STP_MAIN_USER_POOL_CLIENT_ID,
  tokenUse: 'id',
});
