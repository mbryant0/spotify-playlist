package com.mbryant.spotifyplaylistgenerator.services;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;
import com.mbryant.spotifyplaylistgenerator.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service(value = "playlistService")
public class PlaylistServiceImpl implements PlaylistService
{
    @Autowired
    private PlaylistRepository playlistrepos;

    @Transactional
    @Override
    public Playlist save(Playlist playlist){
        return playlistrepos.save(playlist);
    }
}
