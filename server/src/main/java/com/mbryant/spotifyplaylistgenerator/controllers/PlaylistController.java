package com.mbryant.spotifyplaylistgenerator.controllers;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;
import com.mbryant.spotifyplaylistgenerator.services.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

/*
{
    "birthdate": null,
    "country": null,
    "displayName": "Micki & the Mic",
    "email": "torkiemorkie1905@gmail.com",
    "externalUrls": {
        "externalUrls": {
            "spotify": "https://open.spotify.com/user/twigj4idl93rxvgw4v1wbp5lj"
        }
    },
    "followers": {
        "href": null,
        "total": 11
    },
    "href": "https://api.spotify.com/v1/users/twigj4idl93rxvgw4v1wbp5lj",
    "id": "twigj4idl93rxvgw4v1wbp5lj",
    "images": [
        {
            "height": null,
            "url": "https://i.scdn.co/image/ab6775700000ee8539e0ff72ff9cb6c70ca2b6eb",
            "width": null
        }
    ],
    "product": null,
    "type": "USER",
    "uri": "spotify:user:twigj4idl93rxvgw4v1wbp5lj"
}
 */

@RestController
@CrossOrigin
@RequestMapping("/playlists")
public class PlaylistController
{
    @Autowired
    private PlaylistService playlistService;

    @GetMapping(value = "/playlist")
    public ResponseEntity<?> listAllPlaylists()
    {
        List<Playlist> listPlaylists = playlistService.findAllPlaylists();
        return new ResponseEntity<>(listPlaylists, HttpStatus.OK);
    }

    @PostMapping(value = "/playlist", consumes = {"application/json"})
    public ResponseEntity<?> addNewPlaylist(
            @Valid
            @RequestBody
                    Playlist newPlaylist
    )
    {
        newPlaylist = playlistService.save(newPlaylist);

        HttpHeaders responseHeaders = new HttpHeaders();
        URI newPlaylistURI = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{playlistid}")
                .buildAndExpand(newPlaylist.getPlaylistid())
                .toUri();
        responseHeaders.setLocation(newPlaylistURI);

        return new ResponseEntity<>(null,
                responseHeaders,
                HttpStatus.CREATED);
    }
}


