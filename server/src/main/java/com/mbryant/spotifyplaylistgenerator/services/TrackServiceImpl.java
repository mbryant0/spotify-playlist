package com.mbryant.spotifyplaylistgenerator.services;


import com.mbryant.spotifyplaylistgenerator.models.Track;
import com.mbryant.spotifyplaylistgenerator.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service(value = "trackService")
public class TrackServiceImpl implements TrackService
{
    @Autowired
    private TrackRepository trackrepos;

    @Transactional
    @Override
    public Track save(Track track){
        return trackrepos.save(track);
    }
}
