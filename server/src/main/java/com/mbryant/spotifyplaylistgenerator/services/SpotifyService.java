package com.mbryant.spotifyplaylistgenerator.services;

import com.mbryant.spotifyplaylistgenerator.Constants;
import com.mbryant.spotifyplaylistgenerator.models.AuthCredential;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.model_objects.specification.User;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import com.wrapper.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
public class SpotifyService
{
    //    Create the redirect URI for spotify API
    private final URI redirectUri = SpotifyHttpManager
            .makeUri( "http://localhost:2019" + Constants.REDIRECT);

    //    Create the spotifyAPI wrapper instance for future use
    private final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(Constants.CLIENT_ID)
            .setClientSecret(Constants.CLIENT_SECRET)
            .setRedirectUri(redirectUri)
            .build();

    //    Create authorization request to get user consent with scopes
    private final AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
            .scope("playlist-modify-private user-read-email")
            .build();

    /**
     * Create the URI to get authorization code from spotify
     * @return String
     */
    public String authorizationCodeUri_Sync() {
        final URI uri = authorizationCodeUriRequest.execute();
        return uri.toString();
    }

    public String getToken(){
        String token = spotifyApi.getAccessToken();
        return token;
    }

    /**
     * Exchange query param from redirect for access tokens
     * @param code String
     * @return AuthCredential
     */
    public AuthCredential exchangeForTokens(String code) {
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();

        AuthorizationCodeCredentials credentials = null;
        try {
            credentials = authorizationCodeRequest.execute();

            spotifyApi.setAccessToken(credentials.getAccessToken());
            spotifyApi.setRefreshToken(credentials.getRefreshToken());

            return new AuthCredential(credentials.getAccessToken(), credentials.getRefreshToken(), credentials.getExpiresIn());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Get the user profile from spotify API
     * @return User
     */
    public User getUserData() {
        try {
            GetCurrentUsersProfileRequest profileRequest = spotifyApi.getCurrentUsersProfile().build();
            return profileRequest.execute();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
