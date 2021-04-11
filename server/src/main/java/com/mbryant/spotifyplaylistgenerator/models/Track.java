package com.mbryant.spotifyplaylistgenerator.models;

import javax.persistence.*;

@Entity
@Table(name = "tracks")
public class Track
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long trackid;

    @Column
    private String trackname;

    @Column
    private String artistname;

    @Column
    private int tempo;

    @Column
    private int numyear;

    @ManyToOne
    @JoinColumn(name = "playlistid", nullable = false)
    private Playlist playlist;


    public Track()
    {
    }

    public Track(String trackname, String artistname, int tempo, int numyear)
    {
        this.trackname = trackname;
        this.artistname = artistname;
        this.tempo = tempo;
        this.numyear = numyear;
    }

    public String getTrackname()
    {
        return trackname;
    }

    public void setTrackname(String trackname)
    {
        this.trackname = trackname;
    }

    public String getArtistname()
    {
        return artistname;
    }

    public void setArtistname(String artistname)
    {
        this.artistname = artistname;
    }

    public int getTempo()
    {
        return tempo;
    }

    public void setTempo(int tempo)
    {
        this.tempo = tempo;
    }

    public int getNumyear()
    {
        return numyear;
    }

    public void setNumyear(int numyear)
    {
        this.numyear = numyear;
    }

    public Playlist getPlaylist()
    {
        return playlist;
    }

    public void setPlaylist(Playlist playlist)
    {
        this.playlist = playlist;
    }
}
