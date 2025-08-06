export function lrcToSrt(lrcContent: string) {
  const lines = lrcContent.split('\n')
  let srtContent = ''
  let index = 1

  for (const line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/)
    if (match) {
      const [, minutes, seconds, centiseconds, text] = match
      const startTime = `00:${minutes}:${seconds},${centiseconds}0`
      const endTime = `00:${minutes}:${(parseInt(seconds) + 5).toString().padStart(2, '0')},${centiseconds}0`

      srtContent += `${index}\n${startTime} --> ${endTime}\n${text.trim()}\n\n`
      index++
    }
  }

  return srtContent
}

