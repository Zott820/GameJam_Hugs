using UnityEngine;
using System.Collections;

public class PersonSpeech : MonoBehaviour
{

		public AudioSource soundManager;
		public GameObject speechbubble;
		private TextMesh speechbubbleText;
		private bool bubbleStatus = false;


		// Use this for initialization
		void Start ()
		{
				soundManager = GetComponent<AudioSource> ();
				speechbubbleText = speechbubble.GetComponentInChildren<TextMesh> ();
				speechbubble.transform.localScale = new Vector3 (0f, 0f, 0f);
		}
	
		// Update is called once per frame
		void Update ()
		{
				if (Input.GetKeyDown ("space")) {
						playVoice (1, "Acceptance");
				}
				//For testing only"

		}

		private AudioClip[] clips;

		void playVoice (int personVoice, string action)
		{
				if (!soundManager.isPlaying && !bubbleStatus) {
						showBubble ();
						StartCoroutine (playAudio (personVoice, action));
				}

		}

		public float bubbleDelay = 2f;
		public float bubblePopSpeed = 2f;
		public float textSizeStart = 125f;
		public float textSizeModifier = 5f;

		void showBubble ()
		{ 
				StartCoroutine (BubbleScale (speechbubble.transform.localScale, new Vector3 (1, 1, 1), bubblePopSpeed, 0, true));
		}

		void hideBubble ()
		{ 
				StartCoroutine (BubbleScale (speechbubble.transform.localScale, new Vector3 (0, 0, 0), bubblePopSpeed, bubbleDelay, false));
		}

		IEnumerator playAudio (int personVoice, string action)
		{

				string directory = "Audio/Person_" + personVoice + "/" + action + "/";
				clips = Resources.LoadAll<AudioClip> (directory);
				int chosenClip = Random.Range (0, clips.Length);
				int clipIndex = int.Parse (clips [chosenClip].name) - 1;
				//The freaking clips are not ordered alphabetically.....grab the line by the name of the audio file *sigh, the fools.

				soundManager.clip = clips [chosenClip];   //Set the clip to a random audio file in the directory.
				soundManager.Play ();
				string allLines = Resources.Load<TextAsset> (directory + "strings").text;
				string[] linesInFile = allLines.Split ('\n');

				if (clipIndex <= linesInFile.Length) {
						speechbubbleText.text = ResolveTextSize (linesInFile [clipIndex], bubbleLength);
						speechbubbleText.fontSize = (int)Mathf.Max ((textSizeStart - speechbubbleText.text.Length * textSizeModifier), 35);
				}

				//Wait until audio is done playing before unloading it.
				yield return new WaitForSeconds (soundManager.clip.length);
				//Unloading doesn't work for now.....
				//Resources.UnloadAsset(clips);

				hideBubble ();
		}

		private IEnumerator BubbleScale (Vector3 start, Vector3 end, float time, float delay, bool finalStatus)
		{
				yield return new WaitForSeconds (delay);

				float elapsedTime = 0;
				while (elapsedTime < time) {
						speechbubble.transform.localScale = (Vector3.Lerp (start, end, (elapsedTime / time)));
						elapsedTime += Time.deltaTime;
						yield return new WaitForEndOfFrame ();
				}
				speechbubble.transform.localScale = end;
				bubbleStatus = finalStatus;
		}

		public int bubbleLength;
		//http://answers.unity3d.com/questions/190800/wrapping-a-textmesh-text.html
		// Wrap text by line height
		private string ResolveTextSize (string input, int lineLength)
		{
				// Split string by char " "
				string[] words = input.Split (" " [0]);
				// Prepare result
				string result = "";
				// Temp line string
				string line = "";
				// for each all words
				foreach (string s in words) {
						// Append current word into line
						string temp = line + " " + s;
						// If line length is bigger than lineLength
						if (temp.Length > lineLength) {
								// Append current line into result
								result += line + "\n";
								// Remain word append into new line
								line = s;
						}
			// Append current word into current line
			else {
								line = temp;
						}
				}
				// Append last line into result
				result += line;
				// Remove first " " char
				return result.Substring (1, result.Length - 1);
		}

}
