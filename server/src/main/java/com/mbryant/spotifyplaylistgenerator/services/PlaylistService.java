package com.mbryant.spotifyplaylistgenerator.services;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;

public interface PlaylistService
{
    Playlist save(Playlist playlist);
}
