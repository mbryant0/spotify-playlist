package com.mbryant.spotifyplaylistgenerator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import static com.mbryant.spotifyplaylistgenerator.auth.ClientAuthorization.authorizationCodeUriSync;


@SpringBootApplication
public class SpotifyPlaylistGeneratorApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(SpotifyPlaylistGeneratorApplication.class, args);
        {
            // authorization here
            authorizationCodeUriSync();
        }
    }

}
