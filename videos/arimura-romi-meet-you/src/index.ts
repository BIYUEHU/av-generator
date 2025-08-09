import {
  async,
  Builder,
  bootstrap,
  DefaultTemplate,
  getLyrics,
  LyricsPresets,
  SongInfoPresets,
  VisualizerPresets,
} from "av-generator";
import { staticFile } from "remotion";

async(async () => {
  const lyrics = await getLyrics(["2o.srt", "2z.srt"]);
  bootstrap(
    DefaultTemplate,
    Builder.create({ audio: staticFile("2.mp3") })
      .setBackground({
        type: "carousel",
        images: ["1.png", "2.png", "1.png"].map(staticFile),
        framesPerImage: 900,
        fadeFrames: 400,
      })
      .setSongInfo({
        coverImage: staticFile("2.png"),
        title: "Song Title",
        subtitle: "Artist Name",
        coverSize: "280px",
        style: {
          position: "absolute",
          top: "30px",
        },
      })
      .setSongInfo(
        SongInfoPresets.topRight(
          staticFile("2.png"),
          "Song Title",
          "Artist Name",
        ),
      )
      .addVisualizer("waveform", VisualizerPresets.waveform.electric())
      .addLyric(LyricsPresets.double.stacked(lyrics[0], lyrics[1]))

      .build(),
  );
});
