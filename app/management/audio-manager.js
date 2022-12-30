import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";

class AudioManager {
  constructor() {
    this.timeInSeconds = 0
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }
  onStartRecord = async (title, setRecordState, maxTime, setAudioLength) => {
    const path = `${title}.m4a`;
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      current_pos = this.audioRecorderPlayer.mmssss(e.currentPosition).split(":")[1]
      this.timeInSeconds = parseInt(current_pos)
      if(this.timeInSeconds == maxTime){
        setRecordState("play")
        setAudioLength(maxTime)
      }
    });
    return uri
  };

  onStopRecord = async (setAudioLength) => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    setAudioLength(this.timeInSeconds)
    this.audioRecorderPlayer.removeRecordBackListener();
  };

  onStartPlay = async (path, setRecordState) => {
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        setRecordState("play")
        this.audioRecorderPlayer.stopPlayer();
      }
    //   this.setState({
    //     currentPositionSec: e.current_position,
    //     currentDurationSec: e.duration,
    //     playTime: this.audioRecorderPlayer.mmssss(
    //       Math.floor(e.current_position),
    //     ),
    //     duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    //   });
    })
  };

  onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
   };
}

const audioManager = new AudioManager();
export default audioManager;