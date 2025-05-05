import { supabase } from "@/utils/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform } from "react-native";

export function AppleAuth() {
  if (Platform.OS === "ios")
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={
          AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
        }
        cornerRadius={5}
        style={{ width: 220, height: 44 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            console.log("credential", credential);

            console.log(JSON.stringify(credential, null, 2));

            // Sign in via Supabase Auth.
            if (credential.identityToken) {
              console.log("credential.identityToken", credential.identityToken);

              const {
                error,
                data: { user },
              } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken,
              });
              console.log(JSON.stringify({ error, user }, null, 2));

              if (!error) {
                console.log("User is signed in.");

                // User is signed in.
              } else {
                console.log("Error signing in: ", error);

                // Error signing in.
              }
            } else {
              console.log("No identityToken.");

              throw new Error("No identityToken.");
            }
          } catch (e: any) {
            console.log("e", e);

            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />
    );
  return <>{/* Implement Android Auth options. */}</>;
}
