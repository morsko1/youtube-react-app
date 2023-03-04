const convertYouTubeDuration = yt_duration => {
  const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
  const extracted = time_extractor.exec(yt_duration);
  const hours = parseInt(extracted[1], 10) || 0;
  const minutes = parseInt(extracted[2], 10) || 0;
  const seconds = parseInt(extracted[3], 10) || 0;

  return `${hours ? hours : ''}${minutes}:${seconds}`;
};

export const format = (videos) => videos.map(item => ({
  id: item.id,
  title: item.snippet.title,
  channelTitle: item.snippet.channelTitle,
  description: item.snippet.description,
  thumbnail: item.snippet.thumbnails.medium,
  publishedAt: item.snippet.publishedAt,
  likeCount: item.statistics.likeCount,
  duration: convertYouTubeDuration(item.contentDetails.duration),
  viewCount: item.statistics.viewCount,
}));
