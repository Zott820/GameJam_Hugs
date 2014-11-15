using UnityEngine;
using System.Collections;

public class CollisionDetect : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnCollisionEnter2D(Collision2D coll) {
		Debug.Log(coll.collider.gameObject.name);
		if (coll.collider.gameObject.name =="Front" ) {
			Debug.Log("You hugged the front");
	} else
			Debug.Log("You going Touch jail son");
}
}
