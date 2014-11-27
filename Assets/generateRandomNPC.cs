using UnityEngine;
using System.Collections;

public class generateRandomNPC : MonoBehaviour
{

		public Sprite[] arms;
		public Sprite[] legs;
		public Sprite[] heads;
		public Sprite[] body;
		public SpriteRenderer armRSprite;
		public SpriteRenderer armLSprite;
		public SpriteRenderer legRSprite;
		public SpriteRenderer legLSprite;
		public SpriteRenderer headSprite;
		public SpriteRenderer bodySprite;

		// Use this for initialization
		void Start ()
		{
	
				int tempRan = Random.Range (0, arms.Length);
				armRSprite.sprite = arms [tempRan];
				armLSprite.sprite = arms [tempRan];

				tempRan = Random.Range (0, legs.Length);
				legRSprite.sprite = legs [tempRan];
				legLSprite.sprite = legs [tempRan];

				tempRan = Random.Range (0, heads.Length);
				headSprite.sprite = heads [tempRan];

				tempRan = Random.Range (0, body.Length);
				bodySprite.sprite = body [tempRan];
		}
	
		// Update is called once per frame
		void Update ()
		{
	
		}
}
