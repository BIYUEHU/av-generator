import { parseMedia } from '@remotion/media-parser'
import { Composition, staticFile } from 'remotion'
import { DefaultTemplate } from '../../../core/src'

const FPS = 30

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MusicVideo"
      component={DefaultTemplate}
      width={1920}
      height={1080}
      defaultProps={{
        audio: {
          src: staticFile('2.mp3'),
          offsetInSeconds: 0
        },
        background: {
          type: 'carousel',
          images: ['1.png', '2.png', '1.png'].map(staticFile),
          framesPerImage: 900,
          fadeFrames: 400
        },
        visualizer: {
          type: 'spectrum',
          color: ['#00ff00', '#0000ff'],
          numberOfSamples: '512',
          linesToDisplay: 85,
          mirrorWave: true,
          style: {
            height: '600px',
            top: '170px'
          }
        },
        lyrics: [
          {
            // zh: {
            src: `1
00:00:00,000 --> 00:00:16,750
作词 : 稻垣千英

2
00:00:16,800 --> 00:00:29,950
蛍の光、窓の雪、

3
00:00:30,000 --> 00:00:43,050
書読(ふみよ)む月日、重ねつゝ、

4
00:00:43,100 --> 00:00:56,050
何時(いつ)しか年も、すぎの戸を、

5
00:00:56,100 --> 00:01:15,950
開けてぞ今朝(けさ)は、別れ行く。

6
00:01:16,000 --> 00:01:28,950
止まるも行くも、限(かぎ)りとて、

7
00:01:29,000 --> 00:01:42,050
形見(かたみ)に思う、千万(ちよろず)の、

8
00:01:42,100 --> 00:01:55,050
心の端(はし)を、一言(ひとこと)に、

9
00:01:55,100 --> 00:02:21,050
幸(さき)くと許(ばっか)り、歌うなり。

10
00:02:21,100 --> 00:02:34,950
筑紫(つくし)の極(きわ)み、陸(みち)の奥、

11
00:02:35,000 --> 00:02:47,950
海山遠く、隔(へだ)つとも、

12
00:02:48,000 --> 00:03:00,950
その真心(まごころ)は、隔て無く、

13
00:03:01,000 --> 00:03:20,850
一へに尽くせ、国の為。

14
00:03:20,900 --> 00:03:33,950
千島(ちしま)の奥も、沖縄(おきなわ)も、

15
00:03:34,000 --> 00:03:47,050
八洲(やしま)の内の、守りなり、

16
00:03:47,100 --> 00:04:00,050
至(いた)らん國に、勲(いさお)しく、

17
00:04:00,100 --> 00:04:10,100
努(つと)めよ我が背、恙無(つゝがな)く。

`
            // },
            //             en: {
            //               src: `1
            // 00:00:16,800 --> 00:00:29,950
            // 萤之光    窗上雪

            // 2
            // 00:00:30,000 --> 00:00:43,050
            // 读书的时光    日积月累

            // 3
            // 00:00:43,100 --> 00:00:56,050
            // 恍惚间    日久经年的门

            // 4
            // 00:00:56,100 --> 00:01:15,950
            // 今朝开启     就要分别了

            // 5
            // 00:01:16,000 --> 00:01:28,950
            // 停留还是前行    都有个时限

            // 6
            // 00:01:29,000 --> 00:01:42,050
            // 无数次思考过    离别的纪念

            // 7
            // 00:01:42,100 --> 00:01:55,050
            // 心中的万千   皆化成一句话

            // 8
            // 00:01:55,100 --> 00:02:21,050
            // 互相祝福告别    伴着歌谣

            // 9
            // 00:02:21,100 --> 00:02:34,950
            // 筑紫的顶端    陆地的深处

            // 10
            // 00:02:35,000 --> 00:02:47,950
            // 山海的远方    相隔的朋友

            // 11
            // 00:02:48,000 --> 00:03:00,950
            // 诚挚的心    没有壁障

            // 12
            // 00:03:01,000 --> 00:03:20,850
            // 鞠躬尽瘁    为国效忠

            // 13
            // 00:03:20,900 --> 00:03:33,950
            // 千岛的深处    冲绳的深处

            // 14
            // 00:03:34,000 --> 00:03:47,050
            // 四海之内    皆被守护

            // 15
            // 00:03:47,100 --> 00:04:00,050
            // 艰难的远方    勇敢地生活

            // 16
            // 00:04:00,100 --> 00:04:10,100
            // 珍重啊    朋友    愿你一路平安

            // `,
            //               style: { fontSize: "40px", color: "#dddddd" },
            //             },
          }
        ],
        songInfo: {
          coverImage: staticFile('2.png'),
          title: 'Song Title',
          subtitle: 'Artist Name',
          position: 'bottom',
          coverSize: '280px'
        }
      }}
      calculateMetadata={async ({ props }) => {
        const { slowDurationInSeconds } = await parseMedia({
          src: props.audio.src,
          fields: {
            slowDurationInSeconds: true
          },
          acknowledgeRemotionLicense: true
        })

        return {
          durationInFrames: Math.floor(slowDurationInSeconds * FPS),
          fps: FPS
        }
      }}
    />
  )
}
