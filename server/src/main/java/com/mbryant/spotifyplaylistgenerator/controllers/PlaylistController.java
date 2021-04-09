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


