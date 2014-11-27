using UnityEngine;
using System.Collections;

public class AnimatePeople : MonoBehaviour {


	private Animator animationScript;

	// Use this for initialization
	void Start () {
	 animationScript = GetComponentInChildren<Animator>();
	}

	// Update is called once per frame
	void Update () {
		animationScript.SetBool("Idle",false);

		if (Input.GetKey("q") && !animationScript.GetCurrentAnimatorStateInfo(0).IsName("Hug") ) {
			animationScript.SetTrigger("Hugging");
		} else if (Input.GetKey("w") && !animationScript.GetCurrentAnimatorStateInfo(0).IsName("Hug")) {
			animationScript.SetTrigger("Walking");
		} else {
			animationScript.SetBool("Idle",true);

		}
	
	}
}
