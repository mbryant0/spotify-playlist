package com.mbryant.spotifyplaylistgenerator.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "playlists")
public class Playlist
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long playlistid;

    @Column(nullable = false)
    private String playlistname;

    @Column
    private boolean playlistprivacy;

    @Column
    private String description;

    @Column
    private int numtracks;

    @Column
    private int lowtempo;

    @Column
    private int hightempo;

    @Column
    private int lowyear;

    @Column
    private int highyear;

    @Column
    private String userid;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Track> tracks = new ArrayList<>();

    public Playlist()
    {
    }

    public Playlist(String playlistname, boolean playlistprivacy, String description, int numtracks, int lowtempo, int hightempo, int lowyear, int highyear, String userid)
    {
        this.playlistname = playlistname;
        this.playlistprivacy = playlistprivacy;
        this.description = description;
        this.numtracks = numtracks;
        this.lowtempo = lowtempo;
        this.hightempo = hightempo;
        this.lowyear = lowyear;
        this.highyear = highyear;
        this.userid = userid;
    }
    
    


    public long getPlaylistid()
    {
        return playlistid;
    }

    public void setPlaylistid(long playlistid)
    {
        this.playlistid = playlistid;
    }

    public String getPlaylistname()
    {
        return playlistname;
    }

    public void setPlaylistname(String playlistname)
    {
        this.playlistname = playlistname;
    }

    public boolean isPlaylistprivacy()
    {
        return playlistprivacy;
    }

    public void setPlaylistprivacy(boolean playlistprivacy)
    {
        this.playlistprivacy = playlistprivacy;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public int getNumtracks()
    {
        return numtracks;
    }

    public void setNumtracks(int numtracks)
    {
        this.numtracks = numtracks;
    }

    public int getLowtempo()
    {
        return lowtempo;
    }

    public void setLowtempo(int lowtempo)
    {
        this.lowtempo = lowtempo;
    }

    public int getHightempo()
    {
        return hightempo;
    }

    public void setHightempo(int hightempo)
    {
        this.hightempo = hightempo;
    }

    public int getLowyear()
    {
        return lowyear;
    }

    public void setLowyear(int lowyear)
    {
        this.lowyear = lowyear;
    }

    public int getHighyear()
    {
        return highyear;
    }

    public void setHighyear(int highyear)
    {
        this.highyear = highyear;
    }

    public List<Track> getTracks()
    {
        return tracks;
    }

    public void setTracks(List<Track> tracks)
    {
        this.tracks = tracks;
    }

    public String getUserid()
    {
        return userid;
    }

    public void setUserid(String userid)
    {
        this.userid = userid;
    }

}
