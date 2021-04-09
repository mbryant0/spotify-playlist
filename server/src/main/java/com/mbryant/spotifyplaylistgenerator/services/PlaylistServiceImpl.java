package com.mbryant.spotifyplaylistgenerator.services;

import com.mbryant.spotifyplaylistgenerator.models.Playlist;
import com.mbryant.spotifyplaylistgenerator.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service(value = "playlistService")
public class PlaylistServiceImpl implements PlaylistService
{
    @Autowired
    private PlaylistRepository playlistrepos;

    @Transactional
    @Override
    public Playlist save(Playlist playlist){
        Playlist newPlaylist = new Playlist();

        newPlaylist.setUserid(newPlaylist.getUserid());
        newPlaylist.setPlaylistname(newPlaylist.getPlaylistname());
        newPlaylist.setPlaylistprivacy(newPlaylist.isPlaylistprivacy());
        newPlaylist.setDescription(newPlaylist.getDescription());
        newPlaylist.setHightempo(newPlaylist.getHightempo());
        newPlaylist.setLowtempo(newPlaylist.getLowtempo());
        newPlaylist.setHighyear(newPlaylist.getHighyear());
        newPlaylist.setLowyear(newPlaylist.getLowyear());
        newPlaylist.setNumtracks(newPlaylist.getNumtracks());
        newPlaylist.setTracks(newPlaylist.getTracks());

        return playlistrepos.save(playlist);
    }

    @Override
    public List<Playlist> findAllPlaylists()
    {
        List<Playlist> list = new ArrayList<>();
        playlistrepos.findAll().iterator().forEachRemaining(list::add);
        return list;
    }
}
