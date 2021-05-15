package com.mbryant.spotifyplaylistgenerator.controllers;

import com.mbryant.spotifyplaylistgenerator.Constants;
import com.mbryant.spotifyplaylistgenerator.models.AuthCredential;
import com.mbryant.spotifyplaylistgenerator.services.SpotifyService;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.model_objects.specification.User;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@CrossOrigin(origins = "*")
@RestController
public class AuthCredentialController
{
    private SpotifyService spotifyService;

    @Autowired
    public AuthCredentialController(SpotifyService spotifyService) {
        this.spotifyService = spotifyService;
    }

    @GetMapping(Constants.AUTHORIZE)
    public String getAuthUrl() {
        return spotifyService.authorizationCodeUri_Sync();
    }

    @GetMapping(value = "/getcredentials", produces = {"application/json"})
    public ResponseEntity<AuthCredential> getAuthFromSpotify(@RequestParam("code") String code) {
        AuthCredential creds = spotifyService.exchangeForTokens(code);
        if (creds == null) return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(creds, HttpStatus.OK);
    }

    @GetMapping(Constants.TOKEN)
    public String getToken(){
        return spotifyService.getToken();
    }

    @GetMapping(Constants.ME)
    public ResponseEntity<User> getProfile() {
        User profile = spotifyService.getUserData();
        if (profile == null) return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}