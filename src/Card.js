import React from 'react';

export const Card = ({
  id,
  title,
  description,
  channelTitle,
  thumbnail,
  duration,
  viewCount,
  likeCount,
}) => (
  <div key={id} className="card">
    <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" className="title" rel="noreferrer">
      <img className="img" src={thumbnail.url} alt="" />
    </a>
    <div className="content">
      <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" className="title" rel="noreferrer">{title}</a>
      <div className="channel">{channelTitle}</div>
      <div className="description">{description}</div>
      <div>duration: {duration}</div>
      <div>views: {viewCount}</div>
      <div>likes: {likeCount}</div>
    </div>
  </div>
);
