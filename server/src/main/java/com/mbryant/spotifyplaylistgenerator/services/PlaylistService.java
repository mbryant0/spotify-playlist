package com.mbryant.spotifyplaylistgenerator.services;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;

import java.util.List;

public interface PlaylistService
{
    Playlist save(Playlist playlist);
    List<Playlist> findAllPlaylists();
}
