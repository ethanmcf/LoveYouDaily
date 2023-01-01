import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from "react-native-audio-recorder-player";
import { PermissionsAndroid } from "react-native";
import { Platform } from "react-native";


class AudioManager {
  constructor() {
    this.timeInSeconds = 0
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }
  onStartRecord = async (title, setRecordState, maxTime, setAudioLength) => {  
    const path = `${title}.m4a`
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      current_pos = this.audioRecorderPlayer.mmssss(e.currentPosition).split(":")
      this.timeInSeconds = parseFloat(current_pos[1]) + parseFloat(current_pos[2]/100)
      if(this.timeInSeconds == maxTime){
        setRecordState("play")
        setAudioLength(maxTime)
      }
    });
    console.log(uri)
    return uri
  };

  onStopRecord = async (setAudioLength) => {
    this.audioRecorderPlayer.stopRecorder();
    setAudioLength(this.timeInSeconds)
    this.audioRecorderPlayer.removeRecordBackListener();
  };

  onStartPlay = async (path, setRecordState) => {
    this.audioRecorderPlayer.startPlayer(path)
    this.audioRecorderPlayer.setVolume(1.0);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        setRecordState("play")
        this.audioRecorderPlayer.stopPlayer();
      }
    })
  };

  onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
   };
}

const audioManager = new AudioManager();
export default audioManager;