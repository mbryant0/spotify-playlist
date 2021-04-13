package com.mbryant.spotifyplaylistgenerator.models;

public class AuthCredential
{
    private String accessToken;
    private String refreshToken;
    private int expiry;

    public AuthCredential(String accessToken, String refreshToken, int expiry) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiry = expiry;
    }

    public AuthCredential() {
    }

    public int getExpiry() {
        return expiry;
    }

    public void setExpiry(int expiry) {
        this.expiry = expiry;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
