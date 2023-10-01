import { TypeOf, object, string } from "zod";

export const UserToken = object({
    body: object({
      accessToken:  string({ required_error: 'Access Token is required' }).min(
        24,
        'AccessToken to short'
      ),
      refreshToken: string({ required_error: 'Refresh Token is required' }).min(
        24,
        'Refresh Token to short'
      )
    }),
  });


  export type UserAuthToken = TypeOf<typeof UserToken>['body'];