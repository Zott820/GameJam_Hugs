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
						playVoice (1, "Reject");
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
				soundManager.clip = clips [chosenClip];   //Set the clip to a random audio file in the directory.
				soundManager.Play ();

				speechbubbleText.text = Resources.Load<TextAsset> (directory + 1).text;

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

}
