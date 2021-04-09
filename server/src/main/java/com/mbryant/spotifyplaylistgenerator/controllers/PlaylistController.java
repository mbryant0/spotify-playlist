package com.mbryant.spotifyplaylistgenerator.controllers;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;
import com.mbryant.spotifyplaylistgenerator.services.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/playlists")
public class PlaylistController
{
    @Autowired
    private PlaylistService playlistService;

    @PostMapping(value="/playlist", consumes = {"application/json"})
    public ResponseEntity<?> addNewPlaylist(
            @Valid
            @RequestBody
            Playlist newPlaylist
    )
    {
        newPlaylist.setPlaylistid(0);
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
