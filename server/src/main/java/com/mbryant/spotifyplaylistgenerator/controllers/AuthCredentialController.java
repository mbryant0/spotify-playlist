package com.mbryant.spotifyplaylistgenerator.controllers;

import com.mbryant.spotifyplaylistgenerator.Constants;
import com.mbryant.spotifyplaylistgenerator.models.AuthCredential;
import com.mbryant.spotifyplaylistgenerator.services.SpotifyService;
import com.wrapper.spotify.model_objects.specification.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping(Constants.REDIRECT)
    public ResponseEntity<AuthCredential> getAuthFromSpotify(@RequestParam("code") String code) {
        AuthCredential creds = spotifyService.exchangeForTokens(code);
        if (creds == null) return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(creds, HttpStatus.OK);
    }

    @GetMapping(Constants.ME)
    public ResponseEntity<User> getProfile() {
        User profile = spotifyService.getUserData();
        if (profile == null) return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(profile, HttpStatus.OK);
    }
}
