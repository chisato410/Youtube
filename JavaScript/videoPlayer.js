let player;

export function initPlayer(onReady) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      height: "360",
      width: "640",
      videoId: "VIDEO_ID", // ← 適宜変更
      events: {
        onReady: onReady,
      },
    });
  };
}

export function getCurrentTime() {
  return player ? player.getCurrentTime() : 0;
}

export function seekTo(seconds) {
  if (player) player.seekTo(seconds, true);
}
