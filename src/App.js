import React, { useState } from 'react';
import { Card } from './Card';
import { format } from './converter';
import './App.css';

function App() {
  const [query, setQuery] = useState('');

  const [videos, setVideos] = useState([]);

  const [prevPageToken, setPrevPageToken] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');

  const onQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const onSearch = async (pageToken) => {
    const tokenQueryParam = pageToken ? `&pageToken=${pageToken}` : '';

    // search videos
    const response = await window.gapi.client.request({
      path: `https://www.googleapis.com/youtube/v3/search?maxResults=10&type=video&order=rating&q=${query}${tokenQueryParam}`,
    });

    // set next page tokens
    setPrevPageToken(response.result.prevPageToken || '');
    setNextPageToken(response.result.nextPageToken || '');

    const ids = response.result.items.map(item => item.id.videoId).join(',');

    // get videos details
    const videosResponse = await window.gapi.client.request({
      path: `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=statistics,snippet,contentDetails`,
    });

    // format
    const videosFormatted = format(videosResponse.result.items);

    setVideos(videosFormatted);
  };

  // pagination
  const onClickNext = () => {
    onSearch(nextPageToken);
  };

  const onClickPrev = () => {
    onSearch(prevPageToken);
  };

  return (
    <div className="App">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}>
        <input value={query} onChange={onQueryChange} placeholder="Type to search videos"/>
        <button type="submit" >Search</button>
      </form>
      <div className="search-results">
        {
          videos.map(video => (
            <Card
              key={video.id}
              id={video.id}
              title={video.title}
              description={video.description}
              channelTitle={video.channelTitle}
              thumbnail={video.thumbnail}
              duration={video.duration}
              viewCount={video.viewCount}
              likeCount={video.likeCount}
            />
          ))
        }
      </div>
      {
        videos.length > 0 && (
          <div className='pagination'>
            <button onClick={onClickPrev} disabled={!prevPageToken}>prev</button>
            <button onClick={onClickNext} disabled={!nextPageToken}>next</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
