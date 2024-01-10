from pydub import AudioSegment 

audio = AudioSegment.from_file("path/to/audio.mp3") 
 
# Extract raw audio data 
raw_audio = audio.raw_data 

print(1)